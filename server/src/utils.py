from enum import Enum
from rfc3986 import is_valid_uri
from json import JSONEncoder, loads, dumps

def ignore_none_value(data):
   
    return {key: val for key, val in data.items() if val is not None}

def validate_uri(href: str) -> str:
    valid_href = is_valid_uri(href)
    if not valid_href:
        raise TypeError
    return href
    

class NestedEncoder(JSONEncoder):
    def default(self, obj):
        # If it is a class we created and it is having trouble using json_dumps use our to_json class
        if hasattr(obj, "to_json"):
            return obj.to_json()
        # If it is a subclass of Enum just call the name value
        elif isinstance(obj, Enum):
            return obj.name
        else:
            return JSONEncoder.default(self, obj)
            
def object_to_mongodb_dict(obj, extra: dict = None) -> dict:
    """
    :param obj: Data to be transformed from python class to json
    :type obj: Python Class

    :param extra: Extra data to be added to mongo (i.e appinstanceid or another parameter to allow mapping)
    :type dict:

    Takes any object and transforms it into a mongodb acceptable record

    This process may seem weird due to the fact that we are dumping and then loading
    The thought process is that we have classes that naturally give guarantees in terms of object structure and
    validation, but this comes with the drawback that we don't have a dict to send to mongodb
    For this process we use our existing NestedEncoder that properly generates a json string and then load said string,
    allowing us to have a validated python dictionary that is a 1 to 1 representation of the underlying class

    Usage needs to be thorough since we can be overwriting or inserting improper data
    """

    # Append the extra dict to the data before sending it to mongodb
    return_data = loads(dumps(obj, cls=NestedEncoder))
    if extra is not None:
        return_data = return_data | extra
    return return_data