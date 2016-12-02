

var zIndex = 1;

(function(window, document) {
    window.addEventListener('load', loaded, false);

    function loaded() {
        window.removeEventListener('load', loaded, false);
        main();
    }

    function main() {
        var closeButtons = document.querySelectorAll('.close');
        var minimizeButtons = document.querySelectorAll('.minimize');
        var createButton = document.querySelector('.add');

        createButton.addEventListener('click', create, false);

        for (var i = 0; i < minimizeButtons.length; i++) {
            minimizeButtons[i].addEventListener('click', minimize, false);
        }

        for (i = 0; i < closeButtons.length; i++) {
            closeButtons[i].addEventListener('click', close, false);
        }

        document.body.addEventListener('dragover', drag_over, false);
        document.body.addEventListener('drop', drop, false);
    }

    function drag_start(event) {
        var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
        event.dataTransfer.setData("target", event.target.id);
    }

    function drag_over(event) {
        event.preventDefault();
        return false;
    }

    function drop(event) {
        var offset = event.dataTransfer.getData("text/plain").split(',');
        var j = document.getElementById(event.dataTransfer.getData("target"));
        j.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
        j.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
        event.preventDefault();
        return false;
    }

    function close(event) {
        event.stopPropagation();
        var note = this.parentNode.parentNode;
        note.classList.toggle('closed');
        var wrapper = document.querySelector('.wrapper');
        setTimeout(function() {
            wrapper.removeChild(note);
            note = null;
        }, 1000);
    }

    function minimize(event) {
        event.stopPropagation();
        var text = this.parentNode.parentNode.querySelector('.text');
        text.classList.toggle('minimized');
    }

    function move(event) {
        event.preventDefault();
        console.log(event.target);
        event.target.style.left = event.clientX;
        event.target.style.top = event.clientY;
        console.log('dragged', event.clientX, event.clientY);
    }

    function create(event) {
        event.preventDefault();
        var parent = document.querySelector('.add-note');
        var textarea = parent.querySelector('textarea');
        var addButton = parent.querySelector('button');

        parent.classList.toggle('hidden');

        addButton.addEventListener('click', addnote, false);

        function addnote() {
            function test(text) {
                return text.replace(/\n/, '<br/>');
            };

            var source = document.getElementById('entry-template').innerHTML;
            var text = document.querySelector('textarea').value;
            var title = document.querySelector('#titleInput').value;

            var note = document.createElement('div');
            note.classList.add('note');

            console.log(text);
            console.log(title);
            note.setAttribute('draggable', 'true');
            note.setAttribute('id', zIndex);
            note.innerHTML = source;
            note.style['z-index'] = zIndex;

            note.querySelector('.noteTitle').innerText = title;
            note.querySelector('.text').innerText = text;

            zIndex += 1;

            var wrapper = document.querySelector('.wrapper');
            var newNote = wrapper.appendChild(note);
            var closeButton = newNote.querySelector('.close');
            var minimizeButton = newNote.querySelector('.minimize');
            var mainBar = newNote.querySelector('.mainbar');

            newNote.addEventListener('dragstart', drag_start, false);
            parent.classList.toggle('hidden');
            document.querySelector('textarea').value = '';
            document.querySelector('#titleInput').value = '';
            minimizeButton.addEventListener('click', minimize, false);
            closeButton.addEventListener('click', close, false);
            addButton.removeEventListener('click', addnote, false);
        }
    }
})(window, document);
