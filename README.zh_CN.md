# Django-Admin-LastLocation

编辑完一条项目之后，Django 的管理页面默认会自动重定向到项目列表首页。但是，如果项目的数量很多的话，就会很难找到刚刚编辑过的项目了，不好。

这个小项目可以帮你定位最后一次编辑过的项目。


## 视频演示

[优酷]()


## 指南

*注意*: 这个项目是一份指南，**不是**可重用的 app。


#### 安装

    git clone https://github.com/yueyoum/django-admin-lastlocation.git

然后把 `django-admin-lastlocation/admin_lastlocation` 拷贝到你的 `$PYTHONPATH` 里。


#### 配置

##### 在项目的 `settings.py` 里

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


##### 在 `admin.py` 里

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

现在，你的管理页面行为应该和视频演示里的一致了。


<!-- vim:set ai et ts=4 sw=4 sts=4 fenc=utf-8: -->
