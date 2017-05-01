import MemoryClient from './lib/MemoryClient'

export default {
  create (args) {
    return new MemoryClient(args)
  }
}
