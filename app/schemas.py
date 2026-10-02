from pydantic import BaseModel, EmailStr
from typing import Optional

class RegisterIn(BaseModel):
    email: str
    password: str

class LoginIn(BaseModel):
    email: str
    password: str

class CardIn(BaseModel):
    card_number: str
    holder_name: str
    expiry_month: int
    expiry_year: int
    cvv: str  # validate only, not store ma!

class PayIn(BaseModel):
    card_id: int
    amount: float
    merchant: str = "Test Merchant"