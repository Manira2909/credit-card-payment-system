from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255))
    balance = Column(Float, default=50000.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    cards = relationship("CreditCard", back_populates="owner")
    transactions = relationship("Transaction", back_populates="owner")

class CreditCard(Base):
    __tablename__ = "credit_cards"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    card_number_enc = Column(String(255)) # encrypted
    last_four = Column(String(4))
    holder_name = Column(String(100))
    expiry_month = Column(Integer)
    expiry_year = Column(Integer)
    card_type = Column(String(20))
    is_active = Column(Boolean, default=True)
    owner = relationship("User", back_populates="cards")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    card_id = Column(Integer, ForeignKey("credit_cards.id"))
    amount = Column(Float)
    merchant = Column(String(100))
    status = Column(String(20), default="success")
    txn_id = Column(String(50), unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    owner = relationship("User", back_populates="transactions")