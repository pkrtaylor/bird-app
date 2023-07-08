import pytest

from django.db import IntegrityError

from tweets.models import Tweet
from account.models import User


pytestmark = pytest.mark.django_db


# def test_create_tweet():
#     Tweet = Tweet.objects.create(name='Foo', code='bar')
#     # we need to do a full refresh to get the value of the path
#     Tweet.refresh_from_db()

#     assert Tweet.id > 0
#     assert Tweet.name == 'Foo'
#     assert Tweet.code == 'bar'
#     assert Tweet.path == 'bar'


def test_direct_children():
    user = User.objects.create_user(
        first_name='kenneth', username='kay', password='light5', email='kenneth@gmail.com')
    user.refresh_from_db()
    user2 = User.objects.filter(username='kay').values('id')

    # user = 'ae71acc8-eb61-4331-9bff-494e09506e4c'
    top = Tweet.objects.create(
        code='332abc893cc44aaf9c8092efc44dd513', user_id_id=user2)
    top.refresh_from_db()

    reply1 = Tweet.objects.create(
        code='332abc893cc44aaf9c8092efc44dd515', parent=top, user_id_id=user2)
    reply2 = Tweet.objects.create(
        code='332abc893cc44aaf9c8092efc44dd516', parent=top, user_id_id=user2)
    reply3 = Tweet.objects.create(
        code='332abc893cc44aaf9c8092efc44dd517', parent=top, user_id_id=user2)

    # we can acess direct children using the `children` property
    assert list(top.children.order_by('code')) == [reply1, reply2, reply3]


# def test_tweets():
#     tweet = Tweet.objects.create(
#         code='332abc893cc44aaf9c8092efc44dd513')
#     tweet.refresh_from_db()

#     tweet2 = Tweet.objects.create(
#         code='332abc893cc44aaf9c8092efc44dd515')
#     tweet2.refresh_from_db()
#     # tweet2 = Tweet.objects.create(
#     #     code='Marvel')
#     # tweet3 = Tweet.objects.create(
#     #     code='DarkHorse')

#     Tweet.objects.create(
#         code='7253974bd11541958a0395f5a837cbe5', parent=tweet)
#     Tweet.objects.create(
#         code='7253974bd11541958a0395f5a837cbe6', parent=tweet2)
#     # Tweet.objects.create(
#     #     code='Thor', parent=tweet)
#     # Tweet.objects.create(
#     #     code='Invincible', parent=tweet)

#     assert list(
#         Tweet.objects
#         .filter(path__descendant=tweet2.path)
#         .values_list('path', flat=True)
#         .order_by('path')
#     ) == [
#         '332abc893cc44aaf9c8092efc44dd515',
#         '332abc893cc44aaf9c8092efc44dd515.7253974bd11541958a0395f5a837cbe6'
#     ]


# def test_descendants():
#     top = Tweet.objects.create(code='top')
#     top.refresh_from_db()

#     science = Tweet.objects.create(code='science', parent=top)
#     Tweet.objects.create(code='maths', parent=science)
#     biology = Tweet.objects.create(code='biology', parent=science)
#     Tweet.objects.create(code='genetics', parent=biology)
#     Tweet.objects.create(code='neuroscience', parent=biology)

#     sport = Tweet.objects.create(code='sport', parent=top)
#     Tweet.objects.create(code='rugby', parent=sport)
#     football = Tweet.objects.create(code='football', parent=sport)
#     Tweet.objects.create(code='champions_league', parent=football)
#     Tweet.objects.create(code='world_cup', parent=football)

#     # we can get all the ancestors of a Tweet (including itself)
#     assert list(
#         Tweet.objects
#         .filter(path__descendant=top.path)
#         .values_list('path', flat=True)
#         .order_by('path')
#     ) == [
#         'top',
#         'top.science',
#         'top.science.biology',
#         'top.science.biology.genetics',
#         'top.science.biology.neuroscience',
#         'top.science.maths',
#         'top.sport',
#         'top.sport.football',
#         'top.sport.football.champions_league',
#         'top.sport.football.world_cup',
#         'top.sport.rugby',
#     ]


# def test_ancestors():
#     top = Tweet.objects.create(code='332abc893cc44aaf9c8092efc44dd515')
#     top.refresh_from_db()

#     Tweet.objects.create(code='332abc893cc44aaf9c8092efc44dd516', parent=top)
#     reply1 = Tweet.objects.create(
#         code='332abc893cc44aaf9c8092efc44dd517', parent=top)
#     Tweet.objects.create(
#         code='332abc893cc44aaf9c8092efc44dd518', parent=reply1)
#     reply1_reply1 = Tweet.objects.create(
#         code='332abc893cc44aaf9c8092efc44dd521', parent=reply1)
#     Tweet.objects.create(
#         code='332abc893cc44aaf9c8092efc44dd519', parent=reply1_reply1)
#     reply1_reply1_reply1 = Tweet.objects.create(
#         code='332abc893cc44aaf9c8092efc44dd520', parent=reply1_reply1)
#     reply1_reply1_reply1.refresh_from_db()

#     # we can get all the ancestors of a Tweet (including itself)
#     assert list(
#         Tweet.objects
#         .filter(path__ancestor=reply1_reply1_reply1.path)
#         .values_list('path', flat=True)
#         .order_by('path')
#     ) == [
#         '332abc893cc44aaf9c8092efc44dd515',
#         '332abc893cc44aaf9c8092efc44dd515.332abc893cc44aaf9c8092efc44dd517',
#         '332abc893cc44aaf9c8092efc44dd515.332abc893cc44aaf9c8092efc44dd517.332abc893cc44aaf9c8092efc44dd521',
#         '332abc893cc44aaf9c8092efc44dd515.332abc893cc44aaf9c8092efc44dd517.332abc893cc44aaf9c8092efc44dd521.332abc893cc44aaf9c8092efc44dd520',
#     ]


# def test_update_code():
#     top = Tweet.objects.create(code='top')
#     top.refresh_from_db()

#     Tweet.objects.create(code='sport', parent=top)
#     science = Tweet.objects.create(code='science', parent=top)
#     biology = Tweet.objects.create(code='biology', parent=science)
#     Tweet.objects.create(code='genetics', parent=biology)
#     Tweet.objects.create(code='neuroscience', parent=biology)

#     # update the code of a Tweet, it should update its path as well as
#     # the path of all of its descendants
#     science.code = 'magic'
#     science.save()

#     assert list(
#         Tweet.objects
#         .filter(path__descendant=top.path)
#         .values_list('path', flat=True)
#         .order_by('path')
#     ) == [
#         'top',
#         'top.magic',
#         'top.magic.biology',
#         'top.magic.biology.genetics',
#         'top.magic.biology.neuroscience',
#         'top.sport',
#     ]


# def test_update_parent():
#     top = Tweet.objects.create(code='top')
#     top.refresh_from_db()

#     Tweet.objects.create(code='sport', parent=top)
#     science = Tweet.objects.create(code='science', parent=top)
#     biology = Tweet.objects.create(code='biology', parent=science)
#     Tweet.objects.create(code='genetics', parent=biology)
#     Tweet.objects.create(code='neuroscience', parent=biology)

#     # update the parent of a Tweet, it should update its path as well as
#     # the path of all of its descendants
#     biology.parent = top
#     biology.save()

#     assert list(
#         Tweet.objects
#         .filter(path__descendant=top.path)
#         .values_list('path', flat=True)
#         .order_by('path')
#     ) == [
#         'top',
#         'top.biology',
#         'top.biology.genetics',
#         'top.biology.neuroscience',
#         'top.science',
#         'top.sport',
#     ]


# def test_simple_recursion():
#     foo = Tweet.objects.create(code='foo')

#     # we cannot be our own parent...
#     foo.parent = foo
#     with pytest.raises(IntegrityError):
#         foo.save()


# def test_nested_recursion():
#     foo = Tweet.objects.create(code='foo')
#     bar = Tweet.objects.create(code='bar', parent=foo)
#     baz = Tweet.objects.create(code='baz', parent=bar)

#     # we cannot be the descendant of one of our parent
#     foo.parent = baz
#     with pytest.raises(IntegrityError):
#         foo.save()
