1. получить список постов
2. отрисовать список постов 
3. сделать отображение отдельного поста

После реализации удаления поста делаем редактирование поста: 
1. Кликаем на кнопку редактирования поста в PostItem
2. клик в PostItem => id принмается в PostList => пост по id принимается в Posts => пост принимается в CreateEditPostForm
3. совершаем запрос в апи с помощью мутации
4. Форма редактирования поста должна открыться предзаполненной
5. В onSubmit если post есть, то вызываем editPostMutate, иначе createPostMutation
6. добавить кнопки сохранить и отправить