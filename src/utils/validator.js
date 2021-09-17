import store from "@/store";
import UserService from "@/backend/user";

export const validName = (name, isEditor = false) => {
    if (name.length > 0) {
        if (!(/^[а-я ]*$/i.test(name))) {
            store.commit('setError', {message: 'Имя содержит недопустимые символы'});
            return true;
        }
        return false
    }
    if (!isEditor) {
        store.commit('setError', {message: 'Пропущено поле Имя'});
    }
    return true
}

export const validLogin = async (login, isEditor = false) => {
    if (login.length > 0) {
        if (!(/^[a-z][a-z0-9\._-]*$/i.test(login))) {
            store.commit('setError', {message: 'В поле логин использаются недопустимые символы'})
            return true;
        }
        let { data } = await UserService.validLogin(login);
        data.isClosed ? store.commit('setError', {message: 'Логин уже занят'}) : '';
        return data.isClosed;
    }
    if (!isEditor) {
        this.$store.commit('setError', {message: 'Пропущено поле Логин'});
    }
    return true;
}
