## 2.1.0
  - fix the new React 15.3.x PropType warnings

## 2.0.0
  - [Aldredcz](https://github.com/Aldredcz) made map key validation happen

## 1.7.2
  - [Lexicality](https://github.com/Lexicality) added support for Immutable > 3.6.2
  - [jsdf](https://github.com/jsdf) gave us a nice performance boost by only generating error messages when they are needed

## 1.7.1 added better warnings
  - thanks to [Monday Chen](https://github.com/mondaychen) for adding this new feature.

## 1.7.0 added mapContains type checker
  - thanks to [Brian Emil Hartz](https://github.com/hartzis) for adding this long requested feature.

## 1.6.0 added stackOf type checker
  - thanks to [Alon Gubkin](https://github.com/alongubkin) for writing the `stackOf` type checker.

## 1.5.0 improved warnings
  - try to specify which Immutable data structure was provided instead of saying `object`.

## 1.4.0
   - added support for orderedSetOf and orderedMapOf

## 1.3.0
  - added support for record and recordOf type checkers.

## 1.2.x
- 1.2.3 [Nik Butenko](http://butenko.me/) provided a better .npmignore file
  - allows devs who want to compile the code to do so
  - better excludes files that are not needed for distribution
- 1.2.2 [Nik Butenko](http://butenko.me/) gave us some nice updates ()
  - [Issue #10](https://github.com/HurricaneJames/react-immutable-proptypes/pull/10) now have better errors when typechecker(s) provided in `propTypes` definition is invalid
  - [Issue #9](https://github.com/HurricaneJames/react-immutable-proptypes/pull/9) removed use of `new` Immutable objects in tests
- 1.2.1 updated documentation to reflect that Immutable object instantiation does not require `new`
- 1.2.0 moved react from peer dependency to dev dependency since React is only used internally to test. This will allow the prop type validators to work on beta/rc versions of react.

## Prior Version Updates
- 1.1.0 added `contains` to replace `shape` validator. `shape` is deprecated and will be removed in v 1.2.0
- 1.0.0 marked as stable, no other changes
- 0.1.8 added `setOf` checker. Thanks to [Don Abrams](https://github.com/donabrams)!
- 0.1.7 added convencience checkers for "primitive" immutable types (map, list, etc...)
- 0.1.6 added `iterableOf`
- 0.1.4 added `mapOf`
- 0.1.3 updated package.json to support React v0.11.0+ (including 0.13.1). Thanks [Andrey Okonetchnikov](https://github.com/okonet)!
