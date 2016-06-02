define(["./avalon.getModel", 'text!./avalon.rating.html', 'css!../chameleon/oniui-common.css'],
    function(avalon, template) {
        var getFunc = function(name, vmodels) {
                var changeVM = avalon.getModel(name, vmodels);
                return changeVM && changeVM[1][changeVM[0]] || avalon.noop;
            };
        var _interface = function () {};
        avalon.component("ms:rating",{
            defaultValue: 0,
            max: 5,
            margin: 3,
            notSelectedColor: '#CECECE',
            notSelectedContent: '&#xf08A;',
            selectedColor: '#00A3C2',
            selectedContent: '&#xf038;',
            value:0,
            floatValue:0,
            size: 20,
            list:[],
            $template:template,
            mouseover:_interface,
            select:_interface,
            mouseout:_interface,
            setByIp:_interface,
            getRating:_interface,
            set:_interface,
            $remove:_interface,
            $construct:function(a,b,c){
                var options = avalon.mix(a,b,c);
                options.list = new Array(options.max);
                return options;
            },
            $init:function(vm,element){
                vm.value = vm.floatValue = element.value;
                var onSelect = getFunc('onSelect', avalon.vmodels),
                    onFloat = getFunc('onFloat', avalon.vmodels);
                vm.mouseover = function(index) {
                    vm.floatValue = index + 1;
                };
                vm.select = function(index) {
                    if(vm.value >0 && vm.value == (index+1)){
                        vm.value = 0;
                    }else{
                        vm.value = index + 1;
                    }
                };

                vm.mouseout = function() {
                    vm.floatValue = vm.value;
                };

                vm.setByIp = function() {
                    var value = parseInt(element.value);
                    if (value !== vm.value) {
                        vm.value = vm.floatValue = value ? value : 0;
                    }
                };
                vm.getRating = function() {
                    return vm.value
                };

                vm.set = function(value) {
                    vm.value = value;
                    vm.floatValue = value;
                };
                var rating = avalon.parseHTML(template).firstChild;
                    vm.value = vm.floatValue = vm.defaultValue;
                    element.appendChild(rating);
                avalon.scan(rating.parentNode, [vm].concat(avalon.vmodels));
                vm.$remove = function() {
                    rating.parentNode.removeChild(rating);
                    rating = null;
                };
                vm.$watch('value', function(v) {
                    onSelect.call(null, v,
                        element, avalon(element).data());
                });

                vm.$watch('floatValue', function(v) {
                    onFloat.call(null, v,
                        element, avalon(element).data());
                });
            },
            $ready:function(vm,element){
            }
        });
        return avalon;
    });