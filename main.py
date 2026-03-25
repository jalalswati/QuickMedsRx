from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, validator
from enum import Enum
from typing import Optional
from datetime import datetime
import sqlite3
import bcrypt
import os

# =========================
# Config
# =========================

DB_PATH = "quickmedsrx.db"  # SQLite database file


class UserRole(str, Enum):
    pharmacy = "pharmacy"
    patient = "patient"
    driver = "driver"

class SignupRequest(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    confirmPassword: str
    phoneNumber: Optional[str] = None
    streetAddress: Optional[str] = None
    postalCode: Optional[str] = None
    city: Optional[str] = None
    role: UserRole

    @validator("confirmPassword")
    def passwords_match(cls, v, values):
        if "password" in values and v != values["password"]:
            raise ValueError("Passwords do not match")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: UserRole


class LoginResponse(BaseModel):
    message: str
    role: UserRole
    redirectTo: str


# =========================
# Database helpers (RAW SQL)
# =========================

def get_connection():
    """Create a new SQLite connection."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # access columns by name
    return conn


def init_db():
    """Create the users table if it doesn't exist."""
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            phone_number TEXT,
            street_address TEXT,
            postal_code TEXT,
            city TEXT,
            role TEXT NOT NULL,
            created_at TEXT NOT NULL
        );
        """
    )
    conn.commit()
    conn.close()


def hash_password(plain: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(plain.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


# =========================
# FastAPI app
# =========================

app = FastAPI(title="QuickMedsRx Auth API (raw SQL)")

# Allow frontend dev origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can change this to your frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    # Make sure database + table exist
    init_db()


# =========================
# Routes
# =========================

@app.post("/api/signup")
def signup(body: SignupRequest):
    # Basic password rule
    if len(body.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

    conn = get_connection()
    cur = conn.cursor()

    # Check if email already exists
    cur.execute("SELECT id FROM users WHERE email = ?", (body.email,))
    existing = cur.fetchone()
    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")

    # Insert new user
    now_str = datetime.utcnow().isoformat()
    pwd_hash = hash_password(body.password)

    cur.execute(
        """
        INSERT INTO users
        (full_name, email, password_hash, phone_number, street_address,
         postal_code, city, role, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            body.fullName,
            body.email,
            pwd_hash,
            body.phoneNumber,
            body.streetAddress,
            body.postalCode,
            body.city,
            body.role.value,
            now_str,
        ),
    )

    conn.commit()
    conn.close()

    return {"message": "Account created successfully"}


@app.post("/api/login", response_model=LoginResponse)
def login(body: LoginRequest):
    conn = get_connection()
    cur = conn.cursor()

    # Look up user by email
    cur.execute(
        """
        SELECT id, full_name, email, password_hash, role
        FROM users
        WHERE email = ?
        """,
        (body.email,),
    )
    row = cur.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Check password
    if not verify_password(body.password, row["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Check role matches what they chose on login
    if row["role"] != body.role.value:
        raise HTTPException(
            status_code=403,
            detail="This email is not registered with the selected role",
        )

    # Decide where to send them
    redirect_map = {
        "pharmacy": "/pharmacy-dashboard",
        "patient": "/patient-dashboard",
        "driver": "/driver-dashboard",
    }

    return LoginResponse(
        message="Login successful",
        role=body.role,
        redirectTo=redirect_map[body.role.value],
    )
