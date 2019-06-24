interface IRegexField {
    NAME: string;
    USERNAME: string;
    EMAIL: string;
 }
 
 export const REGEX_FIELD: IRegexField = {
    USERNAME: "USERNAME",
    NAME: "NAME",
    EMAIL: "EMAIL"
 }
 
 export function checkEmailRegex( email: string ): boolean {
    var emailRegex = /^[\.a-zA-Z0-9]+@+[a-zA-Z0-9\.]+\.+[A-Za-z]+$/
    return emailRegex.test( email );
 }
 
 export function checkRegexText( newText: string, currentText: string, field?: string ) : string
 {   
    switch(field)
    {
          case( REGEX_FIELD.NAME ) : {
             var format = /^[a-zA-Z]*$/;
             if( format.test(newText) )  {
                break;
             }
             else {
                newText = currentText;  
                break;
             }
          }           
 
          case( REGEX_FIELD.USERNAME ) : {
             var format = /^[a-zA-Z0-9]*$/;
             if( format.test(newText) ){
                if( newText.length > 0 && !isNaN( newText.charAt( 0 ) as unknown as number ) )
                {
                   newText = currentText;
                   break; 
                }
                break;               
             }                   
             else{
                newText = currentText; 
                break;
             }
          }
 
          case( REGEX_FIELD.EMAIL ) : {
             var format = /^[a-zA-Z0-9@\.]*$/
 
             if( ( format.test(newText) ) )
             {
                if ( newText.lastIndexOf('@') !== newText.indexOf('@') || newText.charAt( 0 ) === '@' || newText.charAt( 0 ) === '\.' || newText.charAt( newText.indexOf('@') + 1 ) === '\.' || ( !isNaN( newText.substr( 0, newText.indexOf( '@' ) ) as unknown as number ) ) && newText.indexOf('@') !== -1 )
                {
                   newText = currentText;  
                   break;
                }
 
                if( newText.length > 1 && newText.charAt( 0 ) !== '@' && newText.match('@') )
                {
                   break;
                }            
 
                if( newText.length > 1 && newText.match('\.') !== null && newText.match('\.') !== undefined && newText.indexOf('\.') !== 0 )
                {
                   break;
                }        
             }
             else
             {
                newText = currentText; 
                break;    
             }
          }
 
          default:{
             var format = /^[a-zA-Z0-9]*$/;
 
             if( format.test(newText) )  {
                break;
             }
             else {
                newText = currentText;  
                break;
             }
          }                  
          
    }
    return newText;
 }