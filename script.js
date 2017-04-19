$(function() {
	

	function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
	} // end randomstring

	function Column(name) {
	    var self = this; 
	    this.id = randomString();
	    this.name = name;
	    this.$element = createColumn();

		function createColumn() {
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h4>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add card');
            
            $columnDelete.click(function() {
                self.removeColumn();
            });

            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Type card name")));
            });
            
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            
            return $column;
        } // end create column
    } //end column

	Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };

	function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard(); //

        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            
            $cardDelete.click(function(){
                self.removeCard();
            });
            
            $card.append($cardDelete)
	           .append($cardDescription);
            
            return $card;
        }
    } // end Card

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };

    var board = {
        name: 'My Trello',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    
    $('.create-column').click(function(){
	       var name = prompt('Type column name');
	       var column = new Column(name);
    	   board.addColumn(column);
        });

    // TWORZENIE KOLUMN
    var ideaColumn = new Column("Ideas")
    var todoColumn = new Column("To Do");
    var doingColumn = new Column("Doing");
    var doneColumn = new Column("Done");

    // DODAWANIE KOLUMN DO TABLICY
    board.addColumn(ideaColumn);
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    var card1 = new Card("Your idea")
    var card2 = new Card('New task');
    var card3 = new Card('Create new "trello"');
    var card4 = new Card('You are the best!');

    // DODAWANIE KART DO KOLUMN
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doneColumn.addCard(card3);
    ideaColumn.addCard(card4);

});