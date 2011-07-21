NodeAcl

access = require 'access'
ag = require 'accessGroup'


Request Module
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

 
==========================

Access Module
access.get 'login'
access.add 'login', 'Login', 'login desc', state
access.edit 'login'
access.delete 'login'

accessSchema = {
	id: ObjectId('123897612735')
	slug: 'login'
	name: 'Login'
	desc: 'login desc'
	enable: true, false
}



AccessGroup Module
accessGroup.get 'vipPlayer'
accessGroup.add 'vipPlayer', 'VIP Players', 'VIP player permissions'
accessGroup.edit 'vipPlayer'
accessGroup.delete 'vipPlayer'

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

Relationship Module
role: updating & saving relationships, flow control for conflicts
return: 'success'
err:
	1. conflicting perms, array
	2. save to db error

relationship.assignAccess playerID, [{id: newAccessID, allow: true},{},{} … ] 
relationship.unassignAccess playerID, existingAccessID

relationship.assignAccessGroup playerID newAccessGroupID
relationship.unassignAccessGroup playerID existingAccessGroupID
	


ConflictManager Module
role: check for conflicts, 
success: 'success'
err:
	1. array of object, conflicted perms

{
	access: slug
	new: false
	conflict: ['OwnGroup','PlayerAccessGroup', 'VIPAccessGroup']
	
}


checkConflict playerID, [newPermission,…]

* playerID + newPermission - get existing perms for playerID and merge with newPermission, then check conflict


addAccess
removeAccess
addAccessGroup
removeAccessGroup

player.assoc newAccess, player.assoc newAccessGroup
player.dissoc existingAccess, player.dissoc existingAccessGroup


Dev:
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
