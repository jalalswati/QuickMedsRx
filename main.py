from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, validator
from enum import Enum
from typing import Optional

from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from datetime import datetime
import bcrypt

# =========================
# DB CONFIG
# =========================
# For quick local use we start with SQLite.
# When you’re ready for MySQL, swap DATABASE_URL.
DATABASE_URL = "sqlite:///./quickmedsrx.db"
# Example MySQL URL (uncomment & edit when ready):
# DATABASE_URL = "mysql+pymysql://USER:PASSWORD@localhost:3306/quickmedsrx"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


# =========================
# Models
# =========================

class UserRole(str, Enum):
    pharmacy = "pharmacy"
    patient = "patient"
    driver = "driver"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

    phone_number = Column(String(30))
    street_address = Column(String(255))
    postal_code = Column(String(20))
    city = Column(String(100))

    role = Column(String(20), nullable=False)  # "pharmacy" | "patient" | "driver"
    created_at = Column(DateTime, default=datetime.utcnow)


Base.metadata.create_all(bind=engine)


# =========================
# DTOs (match your React props)
# =========================

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
# FastAPI app
# =========================

app = FastAPI(title="QuickMedsRx Auth API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================
# Password helpers
# =========================

def hash_password(plain: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(plain.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


# =========================
# Routes
# =========================

@app.post("/api/signup")
def signup(body: SignupRequest, db: Session = Depends(get_db)):
    # 1. Email unique?
    existing = db.query(User).filter(User.email == body.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 2. Basic password rule (optional extra checks)
    if len(body.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

    # 3. Create the user, including new fields
    user = User(
        full_name=body.fullName,
        email=body.email,
        password_hash=hash_password(body.password),
        phone_number=body.phoneNumber,
        street_address=body.streetAddress,
        postal_code=body.postalCode,
        city=body.city,
        role=body.role.value,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Account created successfully"}


@app.post("/api/login", response_model=LoginResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    # 1. Find by email
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # 2. Role must match what was used at signup
    if user.role != body.role.value:
        raise HTTPException(status_code=403, detail="This email is not registered with that role")

    # 3. Redirect based on role
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
