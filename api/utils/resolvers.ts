import { Query, Resolver, Arg } from 'type-graphql'
import { SchoolType } from './queries'
import { promises as fs } from 'fs'
import { join } from 'path'

// an example resolver to display info about a school, from ../../data.json
@Resolver()
export class ExampleResolver {
  // get school info
  // let's declare what we return
  @Query(() => SchoolType)
  async schoolInfo () {
    // fetching school info from data.json
    const schoolInfo = JSON.parse(
      new TextDecoder().decode(await fs.readFile(join(__dirname, '../../data.json')))
    ).school_info
    
    // return the data
    return schoolInfo
  }
}