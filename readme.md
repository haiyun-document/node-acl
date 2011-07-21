# node-acl

Access control module for Node with web interface for management. Under heavy development. 

## Basic Elements
`node-acl` uses three building main blocks for defining access control, they are: 

* `request`, each individual **item** which are to be assigned permissions 
* `access`, each individual **permission**, such as `login`, `viewProfile` etc. 
* `accessGroup`, a group of `access` which is then assigned to `requests` as a set of presets.

### Structure

An `access` can be set to `enabled` or `disabled`, which will affect the feature being available or not globally. 

An `accessGroup` can contain a number of `access`, and then within the `accessGroup` the `access` are then set to `allow` or `deny`. 

From `allow` or `deny` we could control who access what, but if the feature is `disabled`, even though `allow` is `true` the feature will still not be available.

## Reference

### Request Module
Role: CRUD for requests


#### Schema
    requestSchema = {_id: ObjectId("123876238746234'),
     access: {
    		id: accessID1,
    		allow:true
    	},
    	{
    		id: accessID2
    		allow:false
    	}
     },
     accessGroup: [accessGroupID1, accessGroupID2…..]
    }

 
### Access Module

#### Methods
    access.get 'login'
    access.add 'login', 'Login', 'login desc', state
    access.edit 'login'
    access.delete 'login'

#### Schema
    accessSchema = {
    	id: ObjectId('123897612735')
    	slug: 'login'
    	name: 'Login'
    	desc: 'login desc'
    	enable: true, false
    }



### AccessGroup Module

#### Methods
    accessGroup.get 'vipPlayer'
    accessGroup.add 'vipPlayer', 'VIP Players', 'VIP player permissions'
    accessGroup.edit 'vipPlayer'
    accessGroup.delete 'vipPlayer'

#### Schema
    accessGroupSchema = {
    	id: ObjectId('123897612735')
    	slug: 'vipAccessGroup'
    	name: 'VIP Access Group'
    	desc: 'VIP access desc'
    	access: {
    		id: accessID1,
    		slug: 'login'
    		perm:allow
    	},
    	{
    		id: accessID2
    		slug: 'vipPromo'
    		perm:deny
    	}
    }

### Relationship Module
Role: updating & saving relationships, flow control for conflicts
success: 'success'
err:
	1. conflicting perms, array
	2. save to db error

#### Methods
    relationship.assignAccess playerID, [{id: newAccessID, allow: true},{},{} … ] 
    relationship.unassignAccess playerID, existingAccessID

    relationship.assignAccessGroup playerID newAccessGroupID
    relationship.unassignAccessGroup playerID existingAccessGroupID
	


## ConflictManager Module
Role: check for conflicts, 
success: `success`
err:
	1. array of object, conflicted perms

#### Schema
    {
    	access: slug
    	new: false
    	conflict: ['OwnGroup','PlayerAccessGroup', 'VIPAccessGroup']	
    }

#### Methods
    checkConflict playerID, [newPermission,…]

* playerID + newPermission - get existing perms for playerID and merge with newPermission, then check conflict


### Developers:
    nodacl = require ('nodacl')

    var perms = nodeacl.getPerms('ObjectID')
    /*{
    	login: true,
    	register: false,
    	chicken: true,
    	donkey: false
    }*/


    nodacl.assign playerID, [{},{}] <------ assign perm
    nodacl.assign playerID, ['',''] <------ assign perm group



    check access:

    if perms.login?
    if perms.viewVIPPromo?

    {
    	login: true
    	viewVIPpromo: true
    }
