from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'My custom startup command'

    def handle(self, *args, **kwargs):
        try:
            # put startup code here
            with open("sample.json", "w") as outfile:
                outfile.write('jsdkkkkkkkkkkkkkkkkkk')
        except:
            raise CommandError('Initalization failed.')
