
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],

    [{'size': ['small', false, 'large', 'huge']}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],
    [{'font': []}],
    [{'align': []}],
    // ['link', 'image', 'video'],
    ['link'],
    ['clean'],
];

export const DIALOGS = {
    CREAT_POST : "create_post_dialog"
}

export const editorOptions = {
    modules: {
        toolbar: {
            container: toolbarOptions
        },
        history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
        }
    }
}

