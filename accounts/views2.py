def change_password(request):
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            # u = form.cleaned_data['username']
            p = form.cleaned_data['password1']
       
        
        u = User.objects.get(username='gooose12')
        # pdb.set_trace()
        u.set_password('123456789')
        u.save()
            # user = authenticate(username = u, password = p)
            # if user is not None:
            #     login(request, user)
            #     Profile.objects.create(user=user)
        return redirect('detail_profile')
        # else:
        #     return render(request, 'register.html', {'form': form})
    else:
        return render(request, 'password_change_form.html')