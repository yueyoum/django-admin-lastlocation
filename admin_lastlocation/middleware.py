import re
from django.http import HttpResponse


class LastLocation(object):
    def __init__(self):
        self._bad_pattern = re.compile('(\d+|add)/$')

    def process_request(self, request):
        if request.path != '/admin/jsi18n/' and \
            request.path.startswith('/admin/') and \
            self._bad_pattern.search(request.path) is None:
            request.session['referer'] = request.path + '?' + request.META['QUERY_STRING']

        
