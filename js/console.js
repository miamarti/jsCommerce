var nConsole = console;
var console = {
	log : function() {
        try{
            [].map.call(arguments, function(obj) {
                document.querySelector('.consoleArea').innerHTML += '[ <span class="tag">' + (typeof arguments[0]) + '</span> ] &nbsp;<span class="code">' + JSON.stringify(arguments[0]) + '</span>,&nbsp;&nbsp;';
            });
            document.querySelector('.consoleArea').innerHTML += '<hr/>';
        } catch(e){
            nConsole.log(e);
        }
	}
};
