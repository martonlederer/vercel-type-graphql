import { Query, Resolver, Arg } from 'type-graphql'
import { SchoolType, StudentType, TeacherType } from './queries'
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

  // get students
  @Query(() => [StudentType])
  async students (
    @Arg('age', { nullable: true }) age: number // add an argument. In this example, if the arguemnt is defined, we return students with the age declared
  ): Promise<StudentType[]> {
    const allStudents: StudentType[] = JSON.parse(
      new TextDecoder().decode(await fs.readFile(join(__dirname, '../../data.json')))
    ).students
    
    // return all students, filtered according to the age argument
    // if it is undefined, we just don't filter out students
    return allStudents.filter(student => age ? age === student.age : true)
  }

  // get teachers
  @Query(() => [TeacherType])
  async teachers (
    @Arg('name', { nullable: true }) name: string,
    @Arg('subject', { nullable: true }) subject: string,
    @Arg('trial', { nullable: true }) trial: boolean
  ): Promise<TeacherType[]> {
    const allTeachers: TeacherType[] = JSON.parse(
      new TextDecoder().decode(await fs.readFile(join(__dirname, '../../data.json')))
    ).teachers

    // let's make all filters
    // undefined args return true in filters
    return allTeachers
      .filter(teacher => name ? teacher.name.toLowerCase() === name.toLowerCase() : true) // teacher name filter
      .filter(teacher => subject ? teacher.subject === subject : true) // teacher subject filter
      .filter(teacher => trial ? teacher.trial === trial : true) // teacher trial status filter
  }
}