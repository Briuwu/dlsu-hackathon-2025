from pydantic import BaseModel, Field
from typing import List
from bson import ObjectId
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import core_schema
from datetime import datetime

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, validation_info: core_schema.ValidationInfo) -> ObjectId:
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(
        cls,
        core_schema: core_schema.CoreSchema,
    ) -> JsonSchemaValue:
        return core_schema.StringSchema(format="objectid")

class User(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    number: str
    subscribed_lgus: List[str]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class LGU(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    image: str
    LGU: str
    pages: List[str]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class SMS(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    sms_message: str
    subscribed_numbers: List[str]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "sms_message": "Class suspension in Manila today.",
                "subscribed_numbers": [
                    "+639123456789"
                ],
                "created_at": "2025-08-16T12:00:00"
            }
        }
