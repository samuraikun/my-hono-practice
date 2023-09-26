import { Hono } from 'hono'

type Variables = {
  message: string
}

const app = new Hono<{ Variables: Variables }>()

app.use('*', async (c, next) => {
  c.set('message', 'Hono is cool!!')
  await next()
})
app.get('/', (c) => {
  const message = c.get('message')
  return c.text(`Message: ${message}`)
})
app.get('/json', (c) => {
  return c.json({
    message: 'Hello Hono!'
  })
})
app.get('/html', (c) => {
  return c.html('<h1>Hello Hono!</h1>')
})
app.get('/stream', (c) => {
  return c.streamText(async (stream) => {
    stream.sleep(1000)
    stream.writeln('Hello')
  })
})
app.get('/welcome', (c) => {
  c.header('X-Message', 'Hello!')
  c.header('Content-Type', 'text/plain')

  c.status(201)

  return c.body('Thank you for coming!')
})

const book = new Hono()
book.get('/', (c) => c.text('List Books'))
book.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.text(`Book ID: ${id}`)
})
book.post('/', (c) => c.text('Create Book'))

app.route('/books', book)
export default app
