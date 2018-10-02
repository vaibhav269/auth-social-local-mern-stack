import React,{Component} from 'react'

class Home extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="col-12 p-3 mt-5 pt-5">
                <div className="text-center display-1 ">Welcome to Node Authentication Window</div>                                           
                <blockquote className="text-center blockquote pt-5" style={{fontSize:"150%",fontFamily:"cursive",opacity:"0.7"}}>
                    <p>
                        "Hey! I am Vaibhav the full stack web developer here I have implemented the Authentication procedure using Facebook and Google OAuth by using react in the front end 
                        and node js at the backend. The better part is that I am using the same server for rendering react js and building apis
                        for the node js."
                    </p>
                    <footer className="blockquote-footer text-right">
                        with love for javascript
                    </footer>

                    </blockquote>
            </div>
            )
    }
}
export default Home;