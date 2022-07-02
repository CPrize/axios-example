class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            sQuery: "",
            sResponse: "Response will show here."
        }

        this.TestGet = this.TestGet.bind(this);
        this.TestPost = this.TestPost.bind(this);
        this.CreateTest = this.CreateTest.bind(this);
        this.DropTest = this.DropTest.bind(this);
        this.SendTest = this.SendTest.bind(this);
        this.GetTest = this.GetTest.bind(this);
        this.DisplayResponse = this.DisplayResponse.bind(this);
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <div id="Response">{this.state.sResponse}</div>
                    </div>
                    <br />
                    <div>
                        <button onClick={this.TestGet}>Test GET</button>
                        <button onClick={this.TestPost}>Test POST</button>
                    </div>
                    <br />
                    <div>
                        <button onClick={this.CreateTest}>Create Table</button>
                        <button onClick={this.DropTest}>Drop Table</button>
                    </div>
                    <br />
                    <div>
                        <input type="text" id="Message" name="input" />
                        <button onClick={this.SendTest}>Send</button>
                    </div>
                    <br />
                    <div>
                        <div id="uinput"></div>
                        <button onClick={this.GetTest}>Retrieve</button>
                    </div>
                </div>
            </div>
        );
    }

    DisplayResponse(objData)
    {
        console.log("DisplayResponse: " + JSON.stringify(objData));
        this.setState({
            sResponse: JSON.stringify(objData)
        });
    }

    TestGet()
    {
        axios.get('http://localhost:3000/api', { params: { message: "Hello World!" }})
        .then((response) => {
            console.log(response.data.message)
            this.DisplayResponse(response.data.message);
        })
        .catch(function (error) {
            this.DisplayResponse(error);
            console.log(error);
        });
    }

    TestPost()
    {
        axios.post('http://localhost:3000/api', { params: { message: "Hello World!" }})
        .then((response) => {
            console.log(response.data.params.message)
            this.DisplayResponse(response.data.params.message);
        })
        .catch(function (error) {
            this.DisplayResponse(error);
            console.log(error);
        });
    }

    CreateTest() {
        axios.post(`http://localhost:3000/api/table`)
        .then((response) => {
            console.log(response.data);
            this.DisplayResponse(response.data);
        })
        .catch(function (error) {
            this.DisplayResponse(error);
            console.log(error);
        });
    }

    DropTest() {
        axios.delete(`http://localhost:3000/api/table`)
        .then((response) => {
            console.log(response.data);
            this.DisplayResponse(response.data);
        })
        .catch(function (error) {
            this.DisplayResponse(error);
            console.log(error);
        });
    }

    SendTest() {
        let message = document.getElementById('Message').value

        const UserInput = {
            message: message
        }

        axios.post(`http://localhost:3000/api/message`, UserInput)
        .then((response) => {
            console.log(response.data.rows[0].message);
            this.DisplayResponse(response.data.rows[0].message);
        })
        .catch(function (error) {
            this.DisplayResponse(error);
            console.log(error);
        });
    }

    GetTest() {
        axios.get('http://localhost:3000/api/message')
        .then((response) => {
            console.log(response.data)
            this.DisplayResponse(response.data);
        })
        .catch(function (error) {
            this.DisplayResponse(error);
            console.log(error);
        });
    }
}

ReactDOM.render (
    React.createElement(Menu, {}),
    document.getElementById('root')
)