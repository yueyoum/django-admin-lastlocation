# Django-Admin-LastLocation

After editing an item, the admin page will redirect to the app's first page
list views; this is default behavior. But it is terrible if one have a lot
of items, in which case it can be really hard to find the item one edited
just now.

This simple project aims to help you locate your last-edited item.


## Video Demo

[Youku]()


## Guide

*Note*: This project is meant to be a guide, *not* a reusable Django app.


#### Installation

    git clone https://github.com/yueyoum/django-admin-lastlocation.git

then copy `django-admin-lastlocation/admin_lastlocation` to your `$PYTHONPATH`.


#### Settings

##### In your project's `settings.py`

```python
from admin_lastlocation import admin_lastlocation_static_path


STATICFILES_DIRS = (
    # ...,
    admin_lastlocation_static_path(),
)

MIDDLEWARE_CLASSES = (
    # ...,
    'admin_lastlocation.middleware.LastLocation',
)
```


##### In your `admin.py`

```python
import re
url_e_pattern = re.compile('$e=\d+')

from django.http import HttpResponseRedirect
from admin_lastlocation.mixins import AdminLastLocationMixin


# in your ModelAdmin, add the following codes
class MyAdmin(admin.ModelAdmin, AdminLastLocationMixin):
    # ....

    def response_change(self, request, obj):
        referer = request.session.get('referer', None):
        if not referer or '_continue' in request.POST or '_addanother' in request.POST:
            return super(self.__class__, self).response_change(request, obj)

    referer = url_e_pattern.split(referer)[0]
    return HttpResponseRedirect(referer + '&e=' + str(obj.id))
```

Now, your admin page should behave the same as in the video demo.


<!-- vim:set ai et ts=4 sw=4 sts=4 fenc=utf-8: -->
