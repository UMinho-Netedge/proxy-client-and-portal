from src.schemas import *
from jsonschema import validate
from src.utils import *

class AddressChangeNotification:
    def __init__(self, notificationType, contextId, appInstanceId, referenceURI):
        self.contextId = contextId
        self.notificationType = notificationType
        self.appInstanceId = appInstanceId
        self.referenceURI = validate_uri(referenceURI)

    @staticmethod
    def from_json(data):
        validate(instance=data, schema=addressChangeNotification_schema)
        contextId = data.get("contextId")
        notificationType = data.get("notificationType")
        appInstanceId = data.get("appInstanceId")
        referenceURI = data.get("referenceURI")
        return AddressChangeNotification(notificationType=notificationType, contextId=contextId, appInstanceId=appInstanceId, referenceURI=referenceURI)
    
    def to_json(self):
        return ignore_none_value(dict(notificationType=self.notificationType, contextId=self.contextId, appInstanceId=self.appInstanceId, referenceURI=self.referenceURI))

class AppContextDeleteNotification:
    def __init__(self, contextId, notificationType):
        self.contextId = contextId
        self.notificationType = notificationType

    @staticmethod
    def from_json(data):
        validate(instance=data, schema=applicationContextDeleteNotification_schema)
        contextId = data.get("contextId")
        notificationType = data.get("notificationType")
        return AppContextDeleteNotification(contextId=contextId, notificationType=notificationType)
    
    def to_json(self):
        return ignore_none_value(dict(notificationType=self.notificationType, contextId=self.contextId))

class LocationConstraints:
    def __init__(self, area = None, civicAddressElement = None, countryCode = None):
        self.area = area
        self.countryCode = countryCode
        self.civicAddressElement = civicAddressElement

    @staticmethod
    def from_json(data):
        validate(instance=data, schema=locationConstraints_schema)
        area = data.get("area")
        countryCode = data.get("countryCode")
        civicAddressElement = data.get("civicAddressElement")
        return LocationConstraints(area=area, countryCode=countryCode, civicAddressElement=civicAddressElement)

    def to_json(self):
        return ignore_none_value(dict(area=self.area, countryCode=self.countryCode, civicAddressElement=self.civicAddressElement))

class UserAppInstanceInfo:
    def __init__(self, appInstanceId, referenceURI, appLocation):
        self.appInstanceId = appInstanceId
        self.referenceURI = validate_uri(referenceURI)
        self.appLocation = appLocation

    @staticmethod
    def from_json(data):
        validate(instance=data, schema=userAppInstanceInfo_schema)
        appLocation = LocationConstraints.from_json(data.pop("appLocation"))
        appInstanceId = data.get("appInstanceId")
        referenceURI = data.get("referenceURI")
        
        return UserAppInstanceInfo(appInstanceId=appInstanceId, referenceURI=referenceURI, appLocation=appLocation)

    def to_json(self):
        return ignore_none_value(dict(appInstanceId=self.appInstanceId, referenceURI=self.referenceURI, appLocation = self.appLocation))

class AppContextUpdateNotification:
    def __init__(self, contextId, userAppInstanceInfo, notificationType):
        self.contextId = contextId
        self.notificationType = notificationType
        self.userAppInstanceInfo = userAppInstanceInfo

    @staticmethod
    def from_json(data):
        userAppInstanceInfo = []
        userAppInstanceInfos = data.pop("userAppInstanceInfo")
        for uaii in userAppInstanceInfos:
            uaii = UserAppInstanceInfo.from_json(uaii)
            userAppInstanceInfo.append(uaii)
        data["userAppInstanceInfo"] = userAppInstanceInfos[0]
        validate(instance=data, schema=applicationContextUpdateNotification_schema)
        contextId = data.get("contextId")
        notificationType = data.get("notificationType")
        return AppContextUpdateNotification(contextId=contextId, userAppInstanceInfo=userAppInstanceInfo, notificationType=notificationType)
    
    def to_json(self):
        return ignore_none_value(dict(notificationType=self.notificationType, contextId=self.contextId, userAppInstanceInfo=self.userAppInstanceInfo))

class AppLocation:
    def __init__(self, appLocation):
        self.appLocation = appLocation

    @staticmethod
    def from_json(data):
        validate(instance=data, schema=availableLocations_schema)
        appLocation = LocationConstraints.from_json(data.pop("appLocation"))
        return AppLocation(appLocation=appLocation)

    def to_json(self):
        return ignore_none_value(dict(appLocation = self.appLocation))

class  AppLocationAvailabilityNotification:
    def __init__(self, contextId, availableLocations, notificationType):
        self.contextId = contextId
        self.notificationType = notificationType
        self.availableLocations = availableLocations

    @staticmethod
    def from_json(data):
        availableLocations = []
        locations = data.pop("availableLocations")
        for al in locations:
            al = AppLocation.from_json(al)
            availableLocations.append(al)
        loc = {}
        loc["appLocation"] = vars(al.appLocation)
        data["availableLocations"] = loc
        validate(instance=data, schema=applicationLocationAvailabilityNotification_schema)
        contextId = data.get("contextId")
        notificationType = data.get("notificationType") 
        return AppLocationAvailabilityNotification(contextId=contextId, availableLocations=availableLocations, notificationType=notificationType)
    
    def to_json(self):
        return ignore_none_value(dict(notificationType=self.notificationType, contextId=self.contextId, availableLocations=self.availableLocations))
