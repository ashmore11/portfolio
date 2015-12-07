class FirebaseData extends Service

	constructor: ( $firebaseArray ) ->

		url  = 'https://scorching-fire-8072.firebaseio.com/projects/'
		ref  = new Firebase url
		data = $firebaseArray ref

		return data.$loaded().then =>

			return {
					
				data: data

			}

	get_project: ( id ) ->

		console.log id

