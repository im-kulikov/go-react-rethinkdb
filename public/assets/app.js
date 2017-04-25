let dbChannels = [
  { name: 'Hardware Support' },
  { name: 'Software Support' }
]

class Channel extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    console.log('Clicked ', this.props.name)
  }

  render () {
    return (
      <li onClick={this.onClick}>{this.props.name}</li>
    )
  }
}

class ChannelList extends React.Component {
  render () {
    return (
      <ul>
        {this.props.channels.map((channel, index) => {
          return (<Channel key={index} name={channel.name} />)
        })}
      </ul>
    )
  }
}

class ChannelForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = { channelName: '' }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (e) {
    this.setState({ channelName: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()

    let { channelName } = this.state

    // Если не смогли добавить, значит что-то не так :)
    if (this.props.addChannel(channelName) === true) {
      this.setState({ channelName: '' })
    }
  }
  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <input type='text' onChange={this.onChange} value={this.state.channelName} />
      </form>
    )
  }
}

class ChannelSection extends React.Component {
  constructor (props) {
    super(props)

    this.state = { channels: dbChannels }

    this.addChannel = this.addChannel.bind(this)
  }

  addChannel (channelName) {
    let { channels } = this.state

    let isDuplicate = channels.filter(e => e.name === channelName).length > 0
    let isEmpty = channelName === '' || channelName === undefined || channelName === null

    // Если пусто или уже есть :)
    if (isEmpty || isDuplicate) return false

    console.log(channels.indexOf({ name: channelName }))

    channels.push({ name: channelName })

    this.setState({ channels: channels })

    return true
  }

  render () {
    return (
      <div>
        <ChannelList channels={this.state.channels} />
        <ChannelForm addChannel={this.addChannel} />
      </div>
    )
  }
}

ReactDOM.render(<ChannelSection />, document.getElementById('app'))
