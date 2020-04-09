$( document ).ready(function() {
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label	 = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName ){
                label.querySelector( 'span' ).innerHTML = fileName;

                let reader = new FileReader();
                reader.onload = function () {
                    let dataURL = reader.result;
                    $("#selected-image").attr("src", dataURL);
                    $("#selected-image").addClass("col-12");
                }
                let file = this.files[0];
                reader.readAsDataURL(file);
                startRecognize(file);
            }
            else{
                label.innerHTML = labelVal;
                $("#selected-image").attr("src", '');
                $("#selected-image").removeClass("col-12");
                $("#arrow-right").addClass("fa-arrow-right");
                $("#arrow-right").removeClass("fa-check");
                $("#arrow-right").removeClass("fa-spinner fa-spin");
                $("#arrow-down").addClass("fa-arrow-down");
                $("#arrow-down").removeClass("fa-check");
                $("#arrow-down").removeClass("fa-spinner fa-spin");
                $("#log").empty();
            }
        });

        // Firefox bug fix
        input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
        input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
    });
});

function startRecognize(file){
    Tesseract.recognize(
        file, $("#langsel").val(),{
            logger:m => console.log(m)
        }).then(({data : {text} }) => {
            console.log(text);
        })
}