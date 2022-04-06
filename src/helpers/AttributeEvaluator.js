export class AttributeEvaluator {

	constructor( citymodel, attributeName, includeNulls = false ) {

		this.citymodel = citymodel;
		this.attributeName = attributeName;
		this.includeNulls = includeNulls;

		this.allValues = [];
		this.uniqueValues = [];

	}

	getAttributeValue( objectId, checkParent = true ) {

		const cityobject = this.citymodel.CityObjects[ objectId ];

		if ( cityobject.attributes && cityobject.attributes[ this.attributeName ] !== undefined ) {

			return cityobject.attributes[ this.attributeName ];

		}

		if ( checkParent && cityobject.parents ) {

			for ( const parentId of cityobject.parents ) {

				return this.getAttributeValue( parentId, true );

			}

		}

		return null;

	}

	getAllValues() {

		if ( this.allValues.length == 0 ) {

			const allValues = [];

			for ( const objId in this.citymodel.CityObjects ) {

				allValues.push( this.getAttributeValue( objId, true ) );

			}

			this.allValues = allValues;

		}

		return this.allValues;

	}

	getUniqueValues() {

		if ( this.uniqueValues.length == 0 ) {

			const uniqueValues = new Set( this.getAllValues() );

			if ( ! this.includeNulls ) {

				uniqueValues.delete( null );

			}

			this.uniqueValues = [ ...uniqueValues ];

		}

		return this.uniqueValues;

	}

	createColors() {

		const uniqueValues = this.getUniqueValues();
		const colors = {};

		for ( const value of uniqueValues ) {

			colors[ value ] = Math.floor( Math.random() * 0xffffff );

		}

		return colors;

	}

}
