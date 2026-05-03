from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id_user = Column(Integer, primary_key=True, index=True)
    nama = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String)

    __mapper_args__ = {
        "polymorphic_on": role,
        "polymorphic_identity": "USER",
    }

class Mahasiswa(User):
    __tablename__ = "mahasiswa"

    id_user = Column(Integer, ForeignKey("users.id_user"), primary_key=True)
    nim = Column(String, unique=True, nullable=False)
    programStudi = Column(String, nullable=False)
    
    daftar_pengajuan = relationship("Pengajuan", back_populates="pembuat")

    __mapper_args__ = {
        "polymorphic_identity": "MAHASISWA",
    }

class Dosen(User):
    __tablename__ = "dosen"

    id_user = Column(Integer, ForeignKey("users.id_user"), primary_key=True)
    nidn = Column(String, unique=True, nullable=False)
    jabatan = Column(String, nullable=False)
    
    tugas_validasi = relationship("Pengajuan", back_populates="validator")

    __mapper_args__ = {
        "polymorphic_identity": "DOSEN",
    }