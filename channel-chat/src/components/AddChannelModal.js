import React from 'react'
import { Button, Header, Image, Modal, Form, Input, Select, Dropdown } from 'semantic-ui-react'
import { API_ROOT } from '../constants/index';


class ModalModalExample extends React.Component {

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })


    constructor() {
        super()
        this.state = {
            channels: [],
            channelOptions: [],

            modalOpen: false
        }
    }

    
    componentDidMount() {
        this.getChannels()
      
    }

    getChannelOptions(channels) {
        let options = []
        channels.map(chan => {
           let obj = {value: chan.name, text: chan.name, key: chan.id}
            options.push(obj)
        })

        this.setState({
            channelOptions: options
        })
    }
    getChannels = () => {
        let token = this.getToken()
        fetch(`${API_ROOT}/channels`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(json => {
                this.getChannelOptions(json)
                this.setState(prevState => {
                    return { channels: json }
                   
                })
            })
    }



    getToken() {
        return localStorage.getItem('jwt')
    }

    handleChange = (ev, { value }) => {
        if (Array.isArray(value)) {
            this.setState({
                channelUsers: value
            })
        } else {
            this.setState({
                channelName: value
            })
        }

    }



    render() {
        return (
            <Modal trigger={<button onClick={this.handleOpen} className="ui basic button">  <i className="icon hashtag"></i>Add Channel</button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Search for a Channel to Add</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Channel Name</Header>
                        <Dropdown
                            placeholder='Select Channel'
                            fluid
                            search
                            selection
                            options={this.state.channelOptions}
                        />
                        <br></br>
                        <Button>Add Channel</Button>
                    </Modal.Description>
                </Modal.Content>
            </Modal>

        )
    }
}

export default ModalModalExample