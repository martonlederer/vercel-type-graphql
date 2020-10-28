import { ObjectType, Field } from 'type-graphql'

// the school type
@ObjectType()
export class SchoolType {
  // create a field inside the type
  @Field()
  name: string 

  @Field()
  location: string
}

// the student type
@ObjectType()
export class StudentType {
  @Field()
  name: string

  @Field()
  age: number
  
  @Field()
  class: string
}

// the teacher type
@ObjectType()
export class TeacherType {
  @Field()
  name: string

  @Field()
  subject: string

  @Field()
  trial: boolean
}