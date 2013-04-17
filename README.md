# Django-Admin-LastLocation

After you edit an item, the admin path will redirect to the app's first page
list views. This is the default behavior.

But this is terrible when your having lots items and lots pages in list views page.

This simple app can help you locate your last edited item


## Demo Video

[youku]()


## Guide

This project is a guide, not a reusable django app.

#### Install

	git clone https://github.com/yueyoum/django-admin-lastlocation.git

then copy django-admin-lastlocation/admin_lastlocation to your python path

#### Settings

###### In Your project's settings.py file

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


###### In your admin.py file

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
				return super(self.__clas__, self).response_change(request, obj)

		referer = url_e_pattern.split(referer)[0]
		return HttpResponseRedirect(referer + '&e=' + str(obj.id))
	```


Now, You Admin page will have the same behavior as the demo in video