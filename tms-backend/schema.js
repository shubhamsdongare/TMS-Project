const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const Employee = require('./models/Employee');

// employe
const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    role: { type: GraphQLString },
    class: { type: GraphQLString },
    subjects: { type: new GraphQLList(GraphQLString) },
    attendance: { type: GraphQLInt }
  })
});

// querie
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    employees: {
      type: new GraphQLList(EmployeeType),
      args: { page: { type: GraphQLInt }, limit: { type: GraphQLInt }, sortBy: { type: GraphQLString } },
      async resolve(parent, args) {
        const page = args.page || 1;
        const limit = args.limit || 10;
        const sort = args.sortBy || 'name';
        return Employee.find().sort({ [sort]: 1 }).skip((page-1)*limit).limit(limit);
      }
    },
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Employee.findById(args.id);
      }
    }
  }
});

// mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        role: { type: GraphQLString },
        class: { type: GraphQLString },
        subjects: { type: new GraphQLList(GraphQLString) },
        attendance: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const emp = new Employee(args);
        return emp.save();
      }
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        class: { type: GraphQLString },
        subjects: { type: new GraphQLList(GraphQLString) },
        attendance: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return Employee.findByIdAndUpdate(args.id, args, { new: true });
      }
    }
  }
});






module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
