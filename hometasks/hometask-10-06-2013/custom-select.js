(function(root, document, $) {

    root.CustomSelect = function(options) {

        // --- инициализация ---

        var self = this, titlePlaceholder, element, title;

        init();
        render();

        // --- приватные методы ---

        function init() {
            titlePlaceholder = options.titlePlaceholder || 'Выберите';
            $(document).click(onDocumentClick);
        }

        function render() {
            var list, item, prop;

            element = $('<div/>', { class: 'custom-select' });
            title = $('<div/>', { class: 'custom-select-title', text: titlePlaceholder });
            list = $('<ol/>', { class: 'custom-select-options' });

            for(prop in options.items) {
                item = $('<li/>', { text: options.items[prop]}).attr('data-value', prop);
                list.append(item);
            }

            element.append(title, list);

            title.on('mousedown selectstart contextmenu', function(event) { event.preventDefault(); })
                .click(onTitleClick);

            list.on('mousedown selectstart contextmenu', 'li', function(event) { event.preventDefault(); })
                .on('click', 'li', onListItemClick);
        }

        function setTitle(value, text) {
            title.attr('data-value', value).text(text);
        }

        function openList() {
            element.addClass('custom-select-open');
        }

        function closeList() {
            element.removeClass('custom-select-open');
        }

        function toggleList() {
            element.toggleClass('custom-select-open');
        }

        function triggerEvent(type, data) {
            $(self).triggerHandler({
                type: type + '.custom-select',
                customData: data
            })
        }

        // --- обработчики событий ---

        function onDocumentClick(event) {
            if(!$(event.target).closest(element).length) closeList();
        }

        function onTitleClick() {
            toggleList();
        }

        function onListItemClick(event) {
            var target = $(event.target),
                value = target.attr('data-value'),
                text = target.text();

            closeList();
            setTitle(value, text);
            triggerEvent('select', { value: value, text: text } );
        }

        // --- публичные методы ---

        this.element = function() {
            return element;
        };

    };

}(window, document, jQuery));