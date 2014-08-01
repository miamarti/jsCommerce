var jsCommerce = (function(document, window){
    Number.prototype.formatMoney = function(c, d, t) {
        var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "." : d, t = t == undefined ? "," : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    
    var core = {
        ShoppingCart : {
            list : [],
            total : 0
        },
        Customer : {
            id : undefined,
            name : undefined,
            areaCode : undefined,
            phone : undefined,
            email : undefined,
            message : undefined
        },
        callback : function(){
        }
    };
    
    core.ShoppingCart.__proto__.setProduct = function(product){
        var increase = false;
        this.list.forEach(function(iten){
            if(iten.itemid == product.dataset.itemid){
                increase = true;
                product.dataset.itemquantity = eval(product.dataset.itemquantity) + 1;
            }
        });
        if(!increase){
            product.dataset.itemquantity = 1;
            this.list.push(product.dataset);
        }
        product.parentNode.parentNode.classList.add('panel');
        product.parentNode.parentNode.classList.add('panel-primary');
        product.parentNode.parentNode.querySelectorAll('.panel-heading .glyphicon-shopping-cart')[0].classList.remove('hide');
        product.parentNode.parentNode.querySelectorAll('.panel-heading .glyphicon-shopping-cart')[0].innerHTML = product.dataset.itemquantity;
        product.parentNode.parentNode.querySelectorAll('.panel-heading .cost')[0].innerHTML =  (eval(product.dataset.itemamount) * eval(product.dataset.itemquantity)).formatMoney(2,",",".");
        core.getCallback();
    };
    core.ShoppingCart.__proto__.deleteProduct = function(product){
        var countRef = 0;
        core.ShoppingCart.list.forEach(function(iten){
            if(iten.itemid == product.dataset.itemid){
                core.ShoppingCart.list.splice((countRef),1);
                product.parentNode.parentNode.classList.remove('panel');
                product.parentNode.parentNode.classList.remove('panel-primary');
                product.parentNode.parentNode.querySelectorAll('.panel-heading span')[0].classList.add('hide');
                product.parentNode.parentNode.querySelectorAll('.panel-heading .cost')[0].innerHTML = "";
            }
            countRef++;
        });
        core.getCallback();
    };
    core.ShoppingCart.__proto__.removeProduct = function(product){
        var countRef = 0;
        core.ShoppingCart.list.forEach(function(iten){
            if(iten.itemid == product.dataset.itemid){
                if(iten.itemquantity > 1){
                    iten.itemquantity--;
                    product.parentNode.parentNode.querySelectorAll('.panel-heading .glyphicon-shopping-cart')[0].innerHTML = product.dataset.itemquantity;
                    product.parentNode.parentNode.querySelectorAll('.panel-heading .cost')[0].innerHTML =  (eval(product.dataset.itemamount) * eval(product.dataset.itemquantity)).formatMoney(2,",",".");
                } else {
                    core.ShoppingCart.list.splice((countRef),1);
                    product.parentNode.parentNode.classList.remove('panel');
                    product.parentNode.parentNode.classList.remove('panel-primary');
                    product.parentNode.parentNode.querySelectorAll('.panel-heading span')[0].classList.add('hide');
                    product.parentNode.parentNode.querySelectorAll('.panel-heading .cost')[0].innerHTML = "";
                }
            }
            countRef++;
        });
        core.getCallback();
    };
    core.ShoppingCart.__proto__.getTotal = function(){
        core.ShoppingCart.total = 0;
        this.list.forEach(function(product){
            core.ShoppingCart.total += eval(product.itemamount) * eval(product.itemquantity);
        });
        [].map.call(document.querySelectorAll('[rel="totalCart"]'), function(obj){
            obj.innerHTML = core.ShoppingCart.total.formatMoney(2,",",".");
        });
        return core.ShoppingCart.total;
    }; 
    core.__proto__.setCallback = function(callback){
        core.callback = callback;
    };
    core.__proto__.getCallback = function(){
        core.ShoppingCart.getTotal();
        core.callback();
    };
    core.__proto__.run = function(callback){
        var _this = this;
        [].map.call(document.querySelectorAll('[rel="addProduct"]'), function(product){
            product.addEventListener('click', function(){
                _this.ShoppingCart.setProduct(this.parentNode);
            }, false);
        });
        [].map.call(document.querySelectorAll('[rel="removeProduct"]'), function(obj){
            obj.addEventListener('click', function(){
                _this.ShoppingCart.removeProduct(this.parentNode);
            }, false);
        });
        [].map.call(document.querySelectorAll('[rel="deleteProduct"]'), function(obj){
            obj.addEventListener('click', function(){
                _this.ShoppingCart.deleteProduct(this.parentNode);
            }, false);
        });
        if(callback != undefined){
            callback();
        }
        return this;
    };
    return core;
})(document, window);