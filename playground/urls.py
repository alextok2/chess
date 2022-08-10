from django.urls import path, include
from .views import activate, game, signup
from django.contrib.auth import views as auth_views
from django.views.generic.base import TemplateView




urlpatterns = [
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('activate/<slug:uidb64>/<slug:token>/', activate, name='activate'),
    path('sign_up/', signup, name='sign_up'),
    path('game/<int:game_id>', game, name="game")
]