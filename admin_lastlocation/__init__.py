import os

def admin_lastlocation_static_path():
    current_path = os.path.dirname(os.path.realpath(__file__))
    return os.path.join(current_path, 'static')
    
