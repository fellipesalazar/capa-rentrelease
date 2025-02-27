$(function () {

    $("#edicao").on("input", function () {
        $(".edicao").text("Edição "+$(this).val());
    });

    $("#mes").on("input", function () {
        $(".mes").text($(this).val());
    });

    $(".baixar").on("click", function (e) {
        gerarImagem($(".mes").text());
    });

    function gerarImagem(mes) {
        window.devicePixelRatio = 2;
        html2canvas(document.querySelector('.capa'),{
            width: 750,
            height: 578,
            backgroundColor: null,
            scale: 4,
            useCORS: true
        }).then(function (canvas) {
            var name = 'capa-rentrelease' + mes.toLowerCase().replace(" ", "-");
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function () {
                let a = document.createElement('a');
                a.href = window.URL.createObjectURL(xhr.response);
                a.download = name + '.png';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                a.remove()
            };
            xhr.open('GET', canvas.toDataURL("image/png", 1.0));
            xhr.send();
        });
    }

    // define as máscaras de formulário
    var SPMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

    $('.mask-phone').mask(SPMaskBehavior, spOptions);

});
