import {Group as $cMxmD$Group, BufferGeometry as $cMxmD$BufferGeometry, BufferAttribute as $cMxmD$BufferAttribute, Vector3 as $cMxmD$Vector3, Matrix4 as $cMxmD$Matrix4, ShaderLib as $cMxmD$ShaderLib, UniformsUtils as $cMxmD$UniformsUtils, UniformsLib as $cMxmD$UniformsLib, ShaderChunk as $cMxmD$ShaderChunk, Color as $cMxmD$Color, ShaderMaterial as $cMxmD$ShaderMaterial, Int32BufferAttribute as $cMxmD$Int32BufferAttribute, Mesh as $cMxmD$Mesh, InstancedBufferAttribute as $cMxmD$InstancedBufferAttribute, Points as $cMxmD$Points, InstancedBufferGeometry as $cMxmD$InstancedBufferGeometry, InstancedMesh as $cMxmD$InstancedMesh, MeshLambertMaterial as $cMxmD$MeshLambertMaterial, TextureLoader as $cMxmD$TextureLoader, sRGBEncoding as $cMxmD$sRGBEncoding, RepeatWrapping as $cMxmD$RepeatWrapping, Texture as $cMxmD$Texture} from "three";
import $cMxmD$earcut from "earcut";
import "three/examples/jsm/lines/LineMaterial.js";
import {LineSegments2 as $cMxmD$LineSegments2} from "three/examples/jsm/lines/LineSegments2.js";
import {LineSegmentsGeometry as $cMxmD$LineSegmentsGeometry} from "three/examples/jsm/lines/LineSegmentsGeometry.js";




class $0c8df94c9b32eef4$export$8131541f6ae89100 {
    constructor(){
        throw new Error("not supported anymore with this version of threejs");
    }
}


class $3eb57bdb1ad2499b$export$639f686e1b458a6e {
    constructor(parser){
        this.texturesPath = "";
        this.scene = new (0, $cMxmD$Group)();
        this.matrix = null;
        this.boundingBox = null;
        this.parser = parser || new (0, $0c8df94c9b32eef4$export$8131541f6ae89100)();
    }
    setTexturesPath(path) {
        this.texturesPath = path;
    }
    load(data) {
        if (typeof data === "object") {
            // We shallow clone the object to avoid modifying the original
            // objects vertices
            const new_data = Object.assign({}, data);
            new_data.vertices = this.applyTransform(data);
            if (this.matrix == null) this.computeMatrix(new_data);
            this.parser.matrix = this.matrix;
            this.parser.parse(new_data, this.scene);
        }
    }
    applyTransform(data) {
        if (data["transform"] != undefined) {
            const t = data.transform.translate;
            const s = data.transform.scale;
            const vertices = data.vertices.map((v)=>[
                    v[0] * s[0] + t[0],
                    v[1] * s[1] + t[1],
                    v[2] * s[2] + t[2]
                ]);
            return vertices;
        }
        return data.vertices;
    }
    /**
	 * Computes a matrix that transforms the dataset close to the origin.
	 *
	 * @param {Object} data The CityJSON data
	 */ computeMatrix(data, scale = false) {
        const normGeom = new (0, $cMxmD$BufferGeometry)();
        const vertices = new Float32Array(data.vertices.map((v)=>[
                v[0],
                v[1],
                v[2]
            ]).flat());
        normGeom.setAttribute("position", new (0, $cMxmD$BufferAttribute)(vertices, 3));
        normGeom.computeBoundingBox();
        this.boundingBox = normGeom.boundingBox;
        const centre = new (0, $cMxmD$Vector3)();
        normGeom.boundingBox.getCenter(centre);
        centre.setZ(0);
        // const radius = normGeom.boundingSphere.radius;
        // const s = scale ? radius === 0 ? 1 : 1.0 / radius : 1;
        const s = 1;
        const matrix = new (0, $cMxmD$Matrix4)();
        matrix.set(s, 0, 0, -s * centre.x, 0, s, 0, -s * centre.y, 0, 0, s, -s * centre.z, 0, 0, 0, 1);
        this.matrix = matrix;
    }
}



const $1bf9b5416b336d87$export$6d0e25691fb94ddb = {
    "Building": 0x7497df,
    "BuildingPart": 0x7497df,
    "BuildingInstallation": 0x7497df,
    "Bridge": 0x999999,
    "BridgePart": 0x999999,
    "BridgeInstallation": 0x999999,
    "BridgeConstructionElement": 0x999999,
    "CityObjectGroup": 0xffffb3,
    "CityFurniture": 0xcc0000,
    "GenericCityObject": 0xcc0000,
    "LandUse": 0xffffb3,
    "PlantCover": 0x39ac39,
    "Railway": 0x000000,
    "Road": 0x999999,
    "SolitaryVegetationObject": 0x39ac39,
    "TINRelief": 0xffdb99,
    "TransportSquare": 0x999999,
    "Tunnel": 0x999999,
    "TunnelPart": 0x999999,
    "TunnelInstallation": 0x999999,
    "WaterBody": 0x4da6ff
};
const $1bf9b5416b336d87$export$865247edfe21a42b = {
    "GroundSurface": 0x999999,
    "WallSurface": 0xffffff,
    "RoofSurface": 0xff0000,
    "TrafficArea": 0x6e6e6e,
    "AuxiliaryTrafficArea": 0x2c8200,
    "Window": 0x0059ff,
    "Door": 0x640000
};


// Geometry types
const $808118d8d449883f$export$7b26c17728cc9ca5 = 0;
const $808118d8d449883f$export$e0de529f548a9140 = 1;
const $808118d8d449883f$export$8f4dac8c1fc6c4ce = 2;
class $808118d8d449883f$export$358a665d160c13a3 {
    constructor(geometryType){
        this.geometryType = geometryType;
        this.vertexIds = [];
        this.objectIds = [];
        this.objectTypes = [];
        this.semanticSurfaces = [];
        this.geometryIds = [];
        this.boundaryIds = [];
        this.lodIds = [];
        this.materials = {};
        this.textures = {};
    }
    appendMaterial(theme, v) {
        if (!(theme in this.materials)) this.materials[theme] = [];
        const themeArray = this.materials[theme];
        for(let i = themeArray.length; i < this.count() - 1; i++)themeArray.push(-1);
        this.materials[theme].push(v);
    }
    appendTexture(theme, values) {
        if (!(theme in this.textures)) this.textures[theme] = {
            index: [],
            uvs: []
        };
        const themeObject = this.textures[theme];
        for(let i = themeObject.index.length; i < this.count() - 1; i++){
            themeObject.index.push(-1);
            themeObject.uvs.push([
                0,
                0
            ]);
        }
        themeObject.index.push(values.index);
        themeObject.uvs.push(values.uvs);
    }
    addVertex(vertexId, objectId, objectType, surfaceType, geometryIdx, boundaryIdx, lodIdx, material, texture) {
        this.vertexIds.push(vertexId);
        this.objectIds.push(objectId);
        this.objectTypes.push(objectType);
        this.semanticSurfaces.push(surfaceType);
        this.geometryIds.push(geometryIdx);
        this.boundaryIds.push(boundaryIdx);
        this.lodIds.push(lodIdx);
        if (material) {
            const context = this;
            Object.entries(material).forEach((entry)=>{
                const [theme, value] = entry;
                context.appendMaterial(theme, value);
            });
        }
        if (texture) {
            const context = this;
            Object.entries(texture).forEach((entry)=>{
                const [theme, value] = entry;
                context.appendTexture(theme, value);
            });
        }
    }
    completeMaterials() {
        for(const theme in this.materials){
            const themeArray = this.materials[theme];
            for(let i = themeArray.length; i < this.count(); i++)themeArray.push(-1);
        }
    }
    completeTextures() {
        for(const theme in this.textures){
            const themeObject = this.textures[theme];
            for(let i = themeObject.index.length; i < this.count(); i++){
                themeObject.index.push(-1);
                themeObject.uvs.push([
                    0,
                    0
                ]);
            }
        }
    }
    count() {
        return this.vertexIds.length;
    }
    getVertices(vertexList) {
        let vertices = [];
        for (const vertexIndex of this.vertexIds){
            const vertex = vertexList[vertexIndex];
            vertices.push(...vertex);
        }
        return vertices;
    }
    toObject() {
        this.completeMaterials();
        this.completeTextures();
        return {
            geometryType: this.geometryType,
            objectIds: this.objectIds,
            objectType: this.objectTypes,
            semanticSurfaces: this.semanticSurfaces,
            geometryIds: this.geometryIds,
            boundaryIds: this.boundaryIds,
            lodIds: this.lodIds,
            materials: this.materials,
            textures: this.textures
        };
    }
    setObjectId(objectId) {
        for(let i = 0; i < this.objectIds.length; i++)this.objectIds[i] = objectId;
    }
    setObjectType(objectType) {
        for(let i = 0; i < this.objectTypes.length; i++)this.objectTypes[i] = objectType;
    }
    setGeometryIdx(geometryIdx) {
        for(let i = 0; i < this.geometryIds.length; i++)this.geometryIds[i] = geometryIdx;
    }
    merge(otherGeomData) {
        if (otherGeomData.geometryType != this.geometryType) console.warn("Merging different types of geometry data!");
        this.vertexIds.concat(this.otherGeomData.vertexId);
        this.objectIds.concat(this.otherGeomData.objectId);
        this.objectTypes.concat(this.otherGeomData.objectType);
        this.semanticSurfaces.concat(this.otherGeomData.surfaceType);
        this.geometryIds.concat(this.otherGeomData.geometryIdx);
        this.boundaryIds.concat(this.otherGeomData.boundaryIdx);
        this.lodIds.concat(this.otherGeomData.lodIdx);
    }
}





(0, $cMxmD$UniformsLib).cityobject = {
    objectColors: {
        value: []
    },
    surfaceColors: {
        value: []
    },
    attributeColors: {
        value: []
    },
    cityMaterials: {
        value: []
    },
    cityTexture: {
        type: "t"
    },
    showLod: {
        value: -1
    },
    highlightedObjId: {
        value: -1
    },
    highlightedGeomId: {
        value: -1
    },
    highlightedBoundId: {
        value: -1
    },
    highlightColor: {
        value: new (0, $cMxmD$Color)(0xFFC107).convertSRGBToLinear()
    }
};
(0, $cMxmD$ShaderChunk).cityobjectinclude_vertex = `
        uniform vec3 objectColors[ OBJCOLOR_COUNT ];
        uniform vec3 highlightColor;
        uniform float highlightedObjId;
        
        attribute float objectid;
        attribute int type;
        
        varying vec3 diffuse_;

        #ifdef SHOW_SEMANTICS

            uniform vec3 surfaceColors[ SEMANTIC_COUNT ];

            attribute int surfacetype;

        #endif

		#ifdef COLOR_ATTRIBUTE

            uniform vec3 attributeColors[ ATTRIBUTE_COUNT ];

            attribute int attributevalue;

        #endif

        #ifdef SELECT_SURFACE

            uniform float highlightedGeomId;
            uniform float highlightedBoundId;

            attribute float geometryid;
            attribute float boundaryid;

        #endif

        #ifdef SHOW_LOD

            uniform float showLod;

            attribute float lodid;

            varying float discard_;
    
        #endif

		#ifdef MATERIAL_THEME

			struct CityMaterial
			{
				vec3 diffuseColor;
				vec3 emissiveColor;
				vec3 specularColor;
			};

			uniform CityMaterial cityMaterials[ MATERIAL_COUNT ];

			varying vec3 emissive_;

			attribute int MATERIAL_THEME;

		#endif

		#ifdef TEXTURE_THEME

			attribute int TEXTURE_THEME;
			attribute vec2 TEXTURE_THEME_UV;

			flat out int vTexIndex;
			varying vec2 vTexUV;

		#endif
    `;
(0, $cMxmD$ShaderChunk).cityobjectdiffuse_vertex = `
        #ifdef SHOW_SEMANTICS

            diffuse_ = surfacetype > -1 ? surfaceColors[surfacetype] : objectColors[type];

        #else

            diffuse_ = objectColors[type];

        #endif

		#ifdef COLOR_ATTRIBUTE

            diffuse_ = attributevalue > -1 ? attributeColors[attributevalue] : vec3( 0.0, 0.0, 0.0 );

        #endif

		#ifdef MATERIAL_THEME

			if ( MATERIAL_THEME > - 1 ) {

				diffuse_ = cityMaterials[ MATERIAL_THEME ].diffuseColor;
				emissive_ = cityMaterials[ MATERIAL_THEME ].emissiveColor;

			}

		#endif

		#ifdef TEXTURE_THEME

			vTexIndex = TEXTURE_THEME;
			vTexUV = TEXTURE_THEME_UV;

			if ( vTexIndex > - 1 ) {

				diffuse_ = vec3( 1.0, 1.0, 1.0 );

			}

		#endif

        #ifdef SELECT_SURFACE

            diffuse_ = abs( objectid - highlightedObjId ) < 0.5 && abs( geometryid - highlightedGeomId ) < 0.5 && abs( boundaryid - highlightedBoundId ) < 0.5 ? highlightColor : diffuse_;

        #else

            diffuse_ = abs( objectid - highlightedObjId ) < 0.5 ? highlightColor : diffuse_;

        #endif
    `;
(0, $cMxmD$ShaderChunk).cityobjectshowlod_vertex = `
        #ifdef SHOW_LOD

            if ( abs ( lodid - showLod ) > 0.5 ) {
                discard_ = 1.0;
            }

        #endif
    `;
class $706853669ce5c06c$export$7a876c8f81ee7589 extends (0, $cMxmD$ShaderMaterial) {
    constructor(shader){
        super(shader);
        this.objectColors = {};
        this.surfaceColors = {};
        this.attributeColors = {};
        this.materials = [];
        this.showSemantics = true;
        this.textures = [];
        this.instancing = false;
        this.isCityObjectsMaterial = true;
        this.defines.OBJCOLOR_COUNT = 0;
        this.defines.SEMANTIC_COUNT = 0;
        this.defines.ATTRIBUTE_COUNT = 0;
        this.defines.MATERIAL_COUNT = 0;
    }
    createColorsArray(colors) {
        const data = [];
        for(const type in colors){
            const color = new (0, $cMxmD$Color)(colors[type]);
            data.push(color.convertSRGBToLinear());
        }
        return data;
    }
    set attributeColors(colors) {
        this.attributeColorsLookup = colors;
        this.uniforms.attributeColors.value = this.createColorsArray(colors);
        this.defines.ATTRIBUTE_COUNT = Object.keys(colors).length;
    }
    get attributeColors() {
        return this.attributeColorsLookup;
    }
    get conditionalFormatting() {
        return Boolean("COLOR_ATTRIBUTE" in this.defines);
    }
    set conditionalFormatting(value) {
        if (Boolean(value) !== Boolean("COLOR_ATTRIBUTE" in this.defines)) this.needsUpdate = true;
        if (value === true) this.defines.COLOR_ATTRIBUTE = "";
        else delete this.defines.COLOR_ATTRIBUTE;
    }
    set objectColors(colors) {
        this.objectColorsLookup = colors;
        // Maybe here we check if the key order has changed
        this.uniforms.objectColors.value = this.createColorsArray(colors);
        this.defines.OBJCOLOR_COUNT = Object.keys(colors).length;
    }
    get objectColors() {
        return this.objectColorsLookup;
    }
    set surfaceColors(colors) {
        this.surfaceColorsLookup = colors;
        // Maybe here we check if the key order has changed
        this.uniforms.surfaceColors.value = this.createColorsArray(colors);
        this.defines.SEMANTIC_COUNT = Object.keys(colors).length;
        this.needsUpdate = true;
    }
    get surfaceColors() {
        return this.surfaceColorsLookup;
    }
    get showSemantics() {
        return Boolean("SHOW_SEMANTICS" in this.defines);
    }
    set showSemantics(value) {
        if (Boolean(value) !== Boolean("SHOW_SEMANTICS" in this.defines)) this.needsUpdate = true;
        if (value === true) this.defines.SHOW_SEMANTICS = "";
        else delete this.defines.SHOW_SEMANTICS;
    }
    get selectSurface() {
        return Boolean("SELECT_SURFACE" in this.defines);
    }
    set selectSurface(value) {
        if (Boolean(value) !== Boolean("SELECT_SURFACE" in this.defines)) this.needsUpdate = true;
        if (value === true) this.defines.SELECT_SURFACE = "";
        else delete this.defines.SELECT_SURFACE;
    }
    get showLod() {
        return this.uniforms.showLod.value;
    }
    set showLod(value) {
        if (Boolean(value > -1) !== Boolean("SHOW_LOD" in this.defines)) this.needsUpdate = true;
        if (value > -1) this.defines.SHOW_LOD = "";
        else delete this.defines.SHOW_LOD;
        this.uniforms.showLod.value = value;
    }
    set materialTheme(value) {
        const themeName = value.replace(/[^a-z0-9]/gi, "");
        if (themeName !== this.defines.MATERIAL_THEME) this.needsUpdate = true;
        if (value === "undefined" || value === undefined || value == null) delete this.defines.MATERIAL_THEME;
        else this.defines.MATERIAL_THEME = `mat${themeName}`;
    }
    set textureTheme(value) {
        const themeName = value.replace(/[^a-z0-9]/gi, "");
        if (themeName !== this.defines.TEXTURE_THEME) this.needsUpdate = true;
        if (value === "undefined" || value === undefined || value == null) {
            delete this.defines.TEXTURE_THEME;
            delete this.defines.TEXTURE_THEME_UV;
        } else {
            this.defines.TEXTURE_THEME = `tex${themeName}`;
            this.defines.TEXTURE_THEME_UV = `tex${themeName}uv`;
        }
    }
    set materials(materials) {
        const data = [];
        for(let i = 0; i < materials.length; i++){
            const mat = Object.assign({
                diffuseColor: [
                    1,
                    1,
                    1
                ],
                emissiveColor: [
                    0,
                    0,
                    0
                ],
                specularColor: [
                    1,
                    1,
                    1
                ]
            }, materials[i]);
            mat.diffuseColor = new (0, $cMxmD$Color)(...mat.diffuseColor).convertLinearToSRGB();
            mat.emissiveColor = new (0, $cMxmD$Color)(...mat.emissiveColor).convertLinearToSRGB();
            mat.specularColor = new (0, $cMxmD$Color)(...mat.specularColor).convertLinearToSRGB();
            data.push(mat);
        }
        this.defines.MATERIAL_COUNT = data.length;
        this.uniforms.cityMaterials.value = data;
    }
    get highlightColor() {
        return this.uniforms.highlightColor;
    }
    set highlightColor(color) {
        if (typeof color === "string" || color instanceof String) this.uniforms.highlightColor.value.setHex(color.replace("#", "0x"));
        else if (color instanceof Number) this.uniforms.highlightColor.setHex(color);
        else if (color instanceof (0, $cMxmD$Color)) this.uniforms.highlightColor = color;
    }
    get highlightedObject() {
        return {
            objectIndex: this.uniforms.highlightedObjId.value,
            geometryIndex: this.uniforms.highlightedGeomId.value,
            boundaryIndex: this.uniforms.highlightedBoundId.value
        };
    }
    /**
	 * Expects an object with three properties: `objectIndex`, `geometryIndex`,
	 * and `boundaryIndex`.
	 */ set highlightedObject(objectInfo) {
        if (objectInfo) {
            this.uniforms.highlightedObjId.value = objectInfo.objectIndex === undefined ? -1 : objectInfo.objectIndex;
            this.uniforms.highlightedGeomId.value = objectInfo.geometryIndex === undefined ? -1 : objectInfo.geometryIndex;
            this.uniforms.highlightedBoundId.value = objectInfo.boundaryIndex === undefined ? -1 : objectInfo.boundaryIndex;
        } else {
            this.uniforms.highlightedObjId.value = -1;
            this.uniforms.highlightedGeomId.value = -1;
            this.uniforms.highlightedBoundId.value = -1;
        }
    }
}


class $4ab887a77a901977$export$55134f84ad9b986a extends (0, $706853669ce5c06c$export$7a876c8f81ee7589) {
    constructor(shader, parameters){
        const newShader = {
            ...shader
        };
        newShader.uniforms = {
            ...(0, $cMxmD$UniformsUtils).clone((0, $cMxmD$UniformsLib).cityobject),
            ...(0, $cMxmD$UniformsUtils).clone(shader.uniforms)
        };
        newShader.extensions = {
            derivatives: true
        };
        newShader.lights = true;
        newShader.vertexShader = (0, $cMxmD$ShaderChunk).cityobjectinclude_vertex + newShader.vertexShader.replace(/#include <fog_vertex>/, `
			#include <fog_vertex>
			` + (0, $cMxmD$ShaderChunk).cityobjectdiffuse_vertex + (0, $cMxmD$ShaderChunk).cityobjectshowlod_vertex);
        newShader.fragmentShader = `
			varying vec3 diffuse_;
			varying float discard_;

			#ifdef TEXTURE_THEME

				uniform sampler2D cityTexture;

				flat in int vTexIndex;
				varying vec2 vTexUV;

			#endif

			#ifdef MATERIAL_THEME

				varying vec3 emissive_;
			
			#endif
		` + newShader.fragmentShader.replace(/vec4 diffuseColor = vec4\( diffuse, opacity \);/, `
			vec4 diffuseColor = vec4( diffuse_, opacity );

			#ifdef TEXTURE_THEME

				if ( vTexIndex > - 1 ) {

					vec4 tempDiffuseColor = vec4(1.0, 1.0, 1.0, 0.0);

					tempDiffuseColor = texture2D( cityTexture, vTexUV );

					diffuseColor *= tempDiffuseColor;

				}

			#endif

			#ifdef SHOW_LOD

				if ( discard_ > 0.0 ) {
					discard;
				}
			
			#endif
			`).replace(/vec3 totalEmissiveRadiance = emissive;/, `
			#ifdef MATERIAL_THEME

				vec3 totalEmissiveRadiance = emissive_;

			#else

				vec3 totalEmissiveRadiance = emissive;

			#endif
			`);
        super(newShader);
        this.setValues(parameters);
    }
}



class $bb9c0ec6c8276320$export$ae02f1ee5353cbee extends (0, $cMxmD$Mesh) {
    constructor(citymodel, vertices, geometryData, matrix, material){
        const geom = new (0, $cMxmD$BufferGeometry)();
        const vertexArray = new Float32Array(vertices);
        geom.setAttribute("position", new (0, $cMxmD$BufferAttribute)(vertexArray, 3));
        const idsArray = new Uint16Array(geometryData.objectIds);
        geom.setAttribute("objectid", new (0, $cMxmD$BufferAttribute)(idsArray, 1));
        const typeArray = new Uint8Array(geometryData.objectType);
        geom.setAttribute("type", new (0, $cMxmD$Int32BufferAttribute)(typeArray, 1));
        const surfaceTypeArray = new Int8Array(geometryData.semanticSurfaces);
        geom.setAttribute("surfacetype", new (0, $cMxmD$Int32BufferAttribute)(surfaceTypeArray, 1));
        const geomIdsArray = new Float32Array(geometryData.geometryIds);
        geom.setAttribute("geometryid", new (0, $cMxmD$BufferAttribute)(geomIdsArray, 1));
        const lodIdsArray = new Int8Array(geometryData.lodIds);
        geom.setAttribute("lodid", new (0, $cMxmD$BufferAttribute)(lodIdsArray, 1));
        const boundaryIdsArray = new Float32Array(geometryData.boundaryIds);
        geom.setAttribute("boundaryid", new (0, $cMxmD$BufferAttribute)(boundaryIdsArray, 1));
        for(const material in geometryData.materials){
            const themeName = material.replace(/[^a-z0-9]/gi, "");
            const materialArray = new Uint8Array(geometryData.materials[material]);
            geom.setAttribute(`mat${themeName}`, new (0, $cMxmD$Int32BufferAttribute)(materialArray, 1));
        }
        for(const texture in geometryData.textures){
            const themeName = texture.replace(/[^a-z0-9]/gi, "");
            const textureArray = new Int16Array(geometryData.textures[texture].index);
            geom.setAttribute(`tex${themeName}`, new (0, $cMxmD$Int32BufferAttribute)(textureArray, 1));
            const textureUVs = new Float32Array(geometryData.textures[texture].uvs.flat(1));
            geom.setAttribute(`tex${themeName}uv`, new (0, $cMxmD$BufferAttribute)(textureUVs, 2));
        }
        geom.attributes.position.needsUpdate = true;
        if (matrix) geom.applyMatrix4(matrix);
        geom.computeVertexNormals();
        super(geom, material);
        this.citymodel = citymodel;
        this.isCityObject = true;
        this.isCityObjectMesh = true;
        this.supportsConditionalFormatting = true;
        this.supportsMaterials = true;
    }
    setArrayAsAttribute(array) {
        this.geometry.setAttribute("attributevalue", new (0, $cMxmD$Int32BufferAttribute)(new Int32Array(array), 1));
    }
    addAttributeByProperty(attributeEvaluator) {
        const allValues = attributeEvaluator.getAllValues();
        const uniqueValues = attributeEvaluator.getUniqueValues();
        if (uniqueValues.length < 110) {
            const objectLookup = [];
            for (const value of allValues)objectLookup.push(uniqueValues.indexOf(value));
            const objectIds = this.geometry.attributes.objectid.array;
            const finalArray = objectIds.map((i)=>{
                return objectLookup[i];
            });
            if (finalArray.length !== objectIds.length) {
                console.warn("Wrong size of attributes array.");
                return;
            }
            this.setArrayAsAttribute(finalArray);
        }
    }
    getIntersectionVertex(intersection) {
        return intersection.face.a;
    }
    resolveIntersectionInfo(intersection) {
        const intersectionInfo = {};
        const vertexIdx = this.getIntersectionVertex(intersection);
        const idx = this.geometry.getAttribute("objectid").getX(vertexIdx);
        intersectionInfo.vertexIndex = vertexIdx;
        intersectionInfo.objectIndex = idx;
        intersectionInfo.objectId = Object.keys(this.citymodel.CityObjects)[idx];
        intersectionInfo.geometryIndex = this.geometry.getAttribute("geometryid").getX(vertexIdx);
        intersectionInfo.boundaryIndex = this.geometry.getAttribute("boundaryid").getX(vertexIdx);
        intersectionInfo.objectTypeIndex = this.geometry.getAttribute("type").getX(vertexIdx);
        intersectionInfo.surfaceTypeIndex = this.geometry.getAttribute("surfacetype").getX(vertexIdx);
        intersectionInfo.lodIndex = this.geometry.getAttribute("lodid").getX(vertexIdx);
        return intersectionInfo;
    }
    setTextureTheme(theme, textureManager) {
        if (theme === "undefined") {
            this.unsetTextures();
            return;
        }
        const themeName = theme.replace(/[^a-z0-9]/gi, "");
        const attributeName = `tex${themeName}`;
        if (attributeName in this.geometry.attributes) {
            const textureIds = this.geometry.attributes[attributeName].array;
            // Create a lookup of textures
            const { values: values , indices: indices  } = textureIds.reduce((p, c, i)=>{
                if (p.last !== c) {
                    p.values.push(c);
                    p.indices.push(i);
                    p.last = c;
                }
                return p;
            }, {
                last: -1,
                values: [],
                indices: []
            });
            const baseMaterial = Array.isArray(this.material) ? this.material[this.material.length - 1] : this.material;
            const materials = textureManager.getMaterials(baseMaterial);
            for (const mat of materials)if (mat !== baseMaterial) mat.textureTheme = theme;
            // TODO: We need to add the last element here
            for(let i = 0; i < indices.length - 1; i++)this.geometry.addGroup(indices[i], indices[i + 1] - indices[i], values[i] > -1 ? values[i] : materials.length - 1);
            const i = indices.length - 1;
            this.geometry.addGroup(indices[i], this.geometry.attributes.type.array.length - indices[i], values[i] > -1 ? values[i] : materials.length - 1);
            this.material = materials;
        }
    }
    unsetTextures() {
        if (Array.isArray(this.material)) this.material = this.material[this.material.length - 1];
        this.material.textureTheme = "undefined";
    }
}





function $d0c483a9fc7b34a9$var$removeDuplicates(array) {
    let newArray = [
        array.length / 2
    ];
    for(let i = 0; i < array.length; i += 2)newArray[i / 2] = array[i];
    return newArray;
}
class $d0c483a9fc7b34a9$export$37a2fa4ad1cc663b extends (0, $cMxmD$LineSegments2) {
    constructor(citymodel, vertices, geometryData, matrix, material){
        const geom = new (0, $cMxmD$LineSegmentsGeometry)();
        geom.setPositions(new Float32Array(vertices));
        const idsArray = new Float32Array($d0c483a9fc7b34a9$var$removeDuplicates(geometryData.objectIds));
        geom.setAttribute("objectid", new (0, $cMxmD$InstancedBufferAttribute)(idsArray, 1));
        const typeArray = new Int32Array($d0c483a9fc7b34a9$var$removeDuplicates(geometryData.objectType));
        geom.setAttribute("type", new (0, $cMxmD$InstancedBufferAttribute)(typeArray, 1));
        const surfaceTypeArray = new Int32Array($d0c483a9fc7b34a9$var$removeDuplicates(geometryData.semanticSurfaces));
        geom.setAttribute("surfacetype", new (0, $cMxmD$InstancedBufferAttribute)(surfaceTypeArray, 1));
        const geomIdsArray = new Float32Array($d0c483a9fc7b34a9$var$removeDuplicates(geometryData.geometryIds));
        geom.setAttribute("geometryid", new (0, $cMxmD$InstancedBufferAttribute)(geomIdsArray, 1));
        const lodIdsArray = new Uint8Array($d0c483a9fc7b34a9$var$removeDuplicates(geometryData.lodIds));
        geom.setAttribute("lodid", new (0, $cMxmD$InstancedBufferAttribute)(lodIdsArray, 1));
        const boundaryIdsArray = new Float32Array($d0c483a9fc7b34a9$var$removeDuplicates(geometryData.boundaryIds));
        geom.setAttribute("boundaryid", new (0, $cMxmD$InstancedBufferAttribute)(boundaryIdsArray, 1));
        // geom.attributes.position.needsUpdate = true;
        if (matrix) geom.applyMatrix4(matrix);
        super(geom, material);
        this.citymodel = citymodel;
        this.isCityObject = true;
        this.isCityObjectLine = true;
    }
    getIntersectionVertex(intersection) {
        return intersection.faceIndex;
    }
    resolveIntersectionInfo(intersection) {
        const intersectionInfo = {};
        const vertexIdx = this.getIntersectionVertex(intersection);
        const idx = this.geometry.getAttribute("objectid").getX(vertexIdx);
        intersectionInfo.vertexIndex = vertexIdx;
        intersectionInfo.objectIndex = idx;
        intersectionInfo.objectId = Object.keys(this.citymodel.CityObjects)[idx];
        intersectionInfo.geometryIndex = this.geometry.getAttribute("geometryid").getX(vertexIdx);
        intersectionInfo.boundaryIndex = this.geometry.getAttribute("boundaryid").getX(vertexIdx);
        intersectionInfo.objectTypeIndex = this.geometry.getAttribute("type").getX(vertexIdx);
        intersectionInfo.surfaceTypeIndex = this.geometry.getAttribute("surfacetype").getX(vertexIdx);
        intersectionInfo.lodIndex = this.geometry.getAttribute("lodid").getX(vertexIdx);
        return intersectionInfo;
    }
}



class $d126339416cd17ed$export$5cfe61655edfe8e7 extends (0, $cMxmD$Points) {
    constructor(citymodel, vertices, geometryData, matrix, material){
        const geom = new (0, $cMxmD$BufferGeometry)();
        const vertexArray = new Float32Array(vertices);
        geom.setAttribute("position", new (0, $cMxmD$BufferAttribute)(vertexArray, 3));
        const idsArray = new Uint16Array(geometryData.objectIds);
        geom.setAttribute("objectid", new (0, $cMxmD$BufferAttribute)(idsArray, 1));
        const typeArray = new Uint8Array(geometryData.objectType);
        geom.setAttribute("type", new (0, $cMxmD$Int32BufferAttribute)(typeArray, 1));
        const surfaceTypeArray = new Int8Array(geometryData.semanticSurfaces);
        geom.setAttribute("surfacetype", new (0, $cMxmD$Int32BufferAttribute)(surfaceTypeArray, 1));
        const geomIdsArray = new Float32Array(geometryData.geometryIds);
        geom.setAttribute("geometryid", new (0, $cMxmD$BufferAttribute)(geomIdsArray, 1));
        const lodIdsArray = new Int8Array(geometryData.lodIds);
        geom.setAttribute("lodid", new (0, $cMxmD$BufferAttribute)(lodIdsArray, 1));
        const boundaryIdsArray = new Float32Array(geometryData.boundaryIds);
        geom.setAttribute("boundaryid", new (0, $cMxmD$BufferAttribute)(boundaryIdsArray, 1));
        geom.attributes.position.needsUpdate = true;
        if (matrix) geom.applyMatrix4(matrix);
        geom.computeVertexNormals();
        super(geom, material);
        this.citymodel = citymodel;
        this.isCityObject = true;
        this.isCityObjectPoints = true;
    }
    getIntersectionVertex(intersection) {
        return intersection.index;
    }
    resolveIntersectionInfo(intersection) {
        const intersectionInfo = {};
        const vertexIdx = this.getIntersectionVertex(intersection);
        const idx = this.geometry.getAttribute("objectid").getX(vertexIdx);
        intersectionInfo.vertexIndex = vertexIdx;
        intersectionInfo.objectIndex = idx;
        intersectionInfo.objectId = Object.keys(this.citymodel.CityObjects)[idx];
        intersectionInfo.geometryIndex = this.geometry.getAttribute("geometryid").getX(vertexIdx);
        intersectionInfo.boundaryIndex = this.geometry.getAttribute("boundaryid").getX(vertexIdx);
        intersectionInfo.objectTypeIndex = this.geometry.getAttribute("type").getX(vertexIdx);
        intersectionInfo.surfaceTypeIndex = this.geometry.getAttribute("surfacetype").getX(vertexIdx);
        intersectionInfo.lodIndex = this.geometry.getAttribute("lodid").getX(vertexIdx);
        return intersectionInfo;
    }
}





class $d92c295e3c013fe5$export$343a261ace1e0698 extends (0, $706853669ce5c06c$export$7a876c8f81ee7589) {
    constructor(parameters){
        const shader = (0, $cMxmD$ShaderLib)["line"];
        const newShader = {
            ...shader
        };
        newShader.uniforms = {
            ...(0, $cMxmD$UniformsLib).cityobject,
            ...(0, $cMxmD$UniformsUtils).clone(shader.uniforms)
        };
        newShader.extensions = {
            derivatives: true
        };
        newShader.lights = false;
        newShader.vertexShader = (0, $cMxmD$ShaderChunk).cityobjectinclude_vertex + newShader.vertexShader.replace(/#include <fog_vertex>/, `
			#include <fog_vertex>
			` + (0, $cMxmD$ShaderChunk).cityobjectdiffuse_vertex + (0, $cMxmD$ShaderChunk).cityobjectshowlod_vertex);
        newShader.fragmentShader = `
			varying vec3 diffuse_;
			varying float discard_;
		` + newShader.fragmentShader.replace(/vec4 diffuseColor = vec4\( diffuse, alpha \);/, `
			vec4 diffuseColor = vec4( diffuse_, alpha );

			#ifdef SHOW_LOD

				if ( discard_ > 0.0 ) {
					discard;
				}
			
			#endif
			`);
        super(newShader);
        Object.defineProperties(this, {
            color: {
                enumerable: true,
                get: function() {
                    return this.uniforms.diffuse.value;
                },
                set: function(value) {
                    this.uniforms.diffuse.value = value;
                }
            },
            worldUnits: {
                enumerable: true,
                get: function() {
                    return "WORLD_UNITS" in this.defines;
                },
                set: function(value) {
                    if (value === true) this.defines.WORLD_UNITS = "";
                    else delete this.defines.WORLD_UNITS;
                }
            },
            linewidth: {
                enumerable: true,
                get: function() {
                    return this.uniforms.linewidth.value;
                },
                set: function(value) {
                    this.uniforms.linewidth.value = value;
                }
            },
            dashed: {
                enumerable: true,
                get: function() {
                    return Boolean("USE_DASH" in this.defines);
                },
                set (value) {
                    if (Boolean(value) !== Boolean("USE_DASH" in this.defines)) this.needsUpdate = true;
                    if (value === true) this.defines.USE_DASH = "";
                    else delete this.defines.USE_DASH;
                }
            },
            dashScale: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashScale.value;
                },
                set: function(value) {
                    this.uniforms.dashScale.value = value;
                }
            },
            dashSize: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashSize.value;
                },
                set: function(value) {
                    this.uniforms.dashSize.value = value;
                }
            },
            dashOffset: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashOffset.value;
                },
                set: function(value) {
                    this.uniforms.dashOffset.value = value;
                }
            },
            gapSize: {
                enumerable: true,
                get: function() {
                    return this.uniforms.gapSize.value;
                },
                set: function(value) {
                    this.uniforms.gapSize.value = value;
                }
            },
            opacity: {
                enumerable: true,
                get: function() {
                    return this.uniforms.opacity.value;
                },
                set: function(value) {
                    this.uniforms.opacity.value = value;
                }
            },
            resolution: {
                enumerable: true,
                get: function() {
                    return this.uniforms.resolution.value;
                },
                set: function(value) {
                    this.uniforms.resolution.value.copy(value);
                }
            },
            alphaToCoverage: {
                enumerable: true,
                get: function() {
                    return Boolean("USE_ALPHA_TO_COVERAGE" in this.defines);
                },
                set: function(value) {
                    if (Boolean(value) !== Boolean("USE_ALPHA_TO_COVERAGE" in this.defines)) this.needsUpdate = true;
                    if (value === true) {
                        this.defines.USE_ALPHA_TO_COVERAGE = "";
                        this.extensions.derivatives = true;
                    } else {
                        delete this.defines.USE_ALPHA_TO_COVERAGE;
                        this.extensions.derivatives = false;
                    }
                }
            }
        });
        this.setValues(parameters);
    }
}





class $f4456a0e1eb1bbfa$export$8eb7f4b873a1ddac extends (0, $706853669ce5c06c$export$7a876c8f81ee7589) {
    constructor(parameters){
        const shader = (0, $cMxmD$ShaderLib).points;
        const newShader = {
            ...shader
        };
        newShader.uniforms = {
            ...(0, $cMxmD$UniformsLib).cityobject,
            ...(0, $cMxmD$UniformsUtils).clone(shader.uniforms)
        };
        newShader.extensions = {
            derivatives: true
        };
        newShader.lights = false;
        newShader.vertexShader = (0, $cMxmD$ShaderChunk).cityobjectinclude_vertex + newShader.vertexShader.replace(/#include <fog_vertex>/, `
			#include <fog_vertex>
			` + (0, $cMxmD$ShaderChunk).cityobjectdiffuse_vertex + (0, $cMxmD$ShaderChunk).cityobjectshowlod_vertex);
        newShader.fragmentShader = `
			varying vec3 diffuse_;
			varying float discard_;
		` + newShader.fragmentShader.replace(/vec4 diffuseColor = vec4\( diffuse, opacity \);/, `
			vec4 diffuseColor = vec4( diffuse_, opacity );

			#ifdef SHOW_LOD

				if ( discard_ > 0.0 ) {
					discard;
				}
			
			#endif
			`);
        super(newShader, parameters);
        this.setValues(parameters);
    }
    get size() {
        return this.uniforms.size.value;
    }
    set size(value) {
        this.uniforms.size.value = value;
    }
    get sizeAttenuation() {
        return Boolean("USE_SIZEATTENUATION" in this.defines);
    }
    set sizeAttenuation(value) {
        if (Boolean(value) !== Boolean("USE_SIZEATTENUATION" in this.defines)) this.needsUpdate = true;
        if (value === true) this.defines.USE_SIZEATTENUATION = "";
        else delete this.defines.USE_SIZEATTENUATION;
    }
}






class $dc54dc99419ef976$export$3d09a5c28ff3e040 {
    constructor(json, objectIds, objectColors){
        this.json = json;
        this.objectIds = objectIds;
        this.objectColors = objectColors;
        this.surfaceColors = (0, $1bf9b5416b336d87$export$865247edfe21a42b);
        this.lods = [];
    }
    clean() {}
    parseGeometry(geometry, objectId, geomIdx) {}
    getObjectIdx(objectId) {
        return this.objectIds.indexOf(objectId);
    }
    getObjectTypeIdx(cityObjectTypeName) {
        let objType = Object.keys(this.objectColors).indexOf(cityObjectTypeName);
        if (objType < 0) {
            objType = Object.keys(this.objectColors).length;
            this.objectColors[cityObjectTypeName] = Math.floor(Math.random() * 0xffffff);
        }
        return objType;
    }
    getSurfaceTypeIdx(idx, semantics, surfaces) {
        let surfaceType = -1;
        if (semantics.length > 0) {
            const surface = surfaces[semantics[idx]];
            if (surface) {
                surfaceType = Object.keys(this.surfaceColors).indexOf(surface.type);
                if (surfaceType < 0) {
                    surfaceType = Object.keys(this.surfaceColors).length;
                    this.surfaceColors[surface.type] = Math.floor(Math.random() * 0xffffff);
                }
            }
        }
        return surfaceType;
    }
    getSurfaceMaterials(idx, material) {
        const pairs = Object.entries(material).map((mat)=>{
            const [theme, obj] = mat;
            if (obj.values) return [
                theme,
                obj.values[idx]
            ];
            else if (obj.value !== undefined) return [
                theme,
                obj.value
            ];
            else return [
                theme,
                -1
            ];
        });
        return Object.fromEntries(pairs);
    }
    getTextureData(surfaceIndex, vertexIndex, holes, texture) {
        if (this.json.appearance && this.json.appearance["vertices-texture"]) {
            const textureVertices = this.json.appearance["vertices-texture"];
            const pairs = Object.entries(texture).map((tex)=>{
                const [theme, obj] = tex;
                if (obj.values) {
                    const activeHoles = holes.filter((v)=>v <= vertexIndex);
                    const ringId = activeHoles.length;
                    const vId = ringId ? vertexIndex - activeHoles[activeHoles.length - 1] : vertexIndex;
                    // TODO: This is very delicate
                    const data = obj.values[surfaceIndex];
                    if (data[0][0] !== null) {
                        const uvs = textureVertices[data[ringId][vId + 1]];
                        return [
                            theme,
                            {
                                index: data[0][0],
                                uvs: uvs
                            }
                        ];
                    }
                    return [
                        theme,
                        {
                            index: -1,
                            uvs: [
                                0,
                                0
                            ]
                        }
                    ];
                } else return [
                    theme,
                    {
                        index: -1,
                        uvs: [
                            0,
                            0
                        ]
                    }
                ];
            });
            return Object.fromEntries(pairs);
        }
        return undefined;
    }
    getLodIndex(lod) {
        if (lod === undefined) return -1;
        const lodIdx = this.lods.indexOf(lod);
        if (lodIdx < 0) {
            const newIdx = this.lods.length;
            this.lods.push(lod);
            return newIdx;
        }
        return lodIdx;
    }
}


class $e16946d8863d2c03$export$744c886637201948 extends (0, $dc54dc99419ef976$export$3d09a5c28ff3e040) {
    constructor(json, objectIds, objectColors, vertices){
        super(json, objectIds, objectColors);
        if (vertices) this.vertices = vertices;
        else this.vertices = this.json.vertices;
        this.geomData = new (0, $808118d8d449883f$export$358a665d160c13a3)((0, $808118d8d449883f$export$8f4dac8c1fc6c4ce));
    }
    clean() {
        this.geomData = new (0, $808118d8d449883f$export$358a665d160c13a3)((0, $808118d8d449883f$export$8f4dac8c1fc6c4ce));
    }
    /**
	 * Flattens the given geometry, meaning that a Solid or MultiSolid will be
	 * basically converted to a MultiSuface
	 */ flattenGeometry(geometry) {
        const geometryType = geometry.type;
        if (geometryType == "MultiSurface" || geometryType == "CompositeSurface") return geometry;
        if (geometryType == "Solid") {
            const newGeometry = Object.assign({}, geometry);
            newGeometry.boundaries = geometry.boundaries.flat(1);
            if (geometry.semantics) newGeometry.semantics.values = geometry.semantics.values.flat(1);
            if (geometry.material) for(const theme in geometry.material)newGeometry.material[theme].values = geometry.material[theme].values.flat(1);
            if (geometry.texture) for(const theme in geometry.texture)newGeometry.texture[theme].values = geometry.texture[theme].values.flat(1);
            return newGeometry;
        }
        if (geometryType == "MultiSolid" || geometryType == "CompositeSolid") {
            const newGeometry = Object.assign({}, geometry);
            newGeometry.boundaries = geometry.boundaries.flat(2);
            if (geometry.semantics) newGeometry.semantics.values = geometry.semantics.values.flat(2);
            if (geometry.material) for(const theme in geometry.material)newGeometry.material[theme].values = geometry.material[theme].values.flat(2);
            if (geometry.texture) for(const theme in geometry.texture)newGeometry.texture[theme].values = geometry.texture[theme].values.flat(2);
            return newGeometry;
        }
    }
    parseGeometry(geometry, objectId, geomIdx) {
        const cityObj = this.json.CityObjects[objectId];
        const idIdx = cityObj ? this.getObjectIdx(objectId) : -1;
        const objType = cityObj ? this.getObjectTypeIdx(cityObj.type) : -1;
        const lodIdx = this.getLodIndex(geometry.lod);
        // We flatten the geometry to a MultiSurface, basically, so that it's
        // easily parsable.
        const flatGeometry = this.flattenGeometry(geometry);
        if (flatGeometry) this.parseShell(flatGeometry, idIdx, objType, geomIdx, lodIdx);
    }
    parseShell(geometry, idIdx, objType, geomIdx, lodIdx) {
        const boundaries = geometry.boundaries;
        const semantics = geometry.semantics ? geometry.semantics.values : [];
        const surfaces = geometry.semantics ? geometry.semantics.surfaces : [];
        const material = geometry.material ? geometry.material : {};
        const texture = geometry.texture ? geometry.texture : {};
        // Contains the boundary but with the right verticeId
        for(let i = 0; i < boundaries.length; i++){
            let boundary = [];
            let holes = [];
            const surfaceType = this.getSurfaceTypeIdx(i, semantics, surfaces);
            const materialValue = this.getSurfaceMaterials(i, material);
            for(let j = 0; j < boundaries[i].length; j++){
                if (boundary.length > 0) holes.push(boundary.length);
                // const new_boundary = this.extractLocalIndices( geom, boundaries[ i ][ j ], vertices, json );
                // boundary.push( ...new_boundary );
                boundary.push(...boundaries[i][j]);
            }
            if (boundary.length == 3) for(let n = 0; n < 3; n++)this.geomData.addVertex(boundary[n], idIdx, objType, surfaceType, geomIdx, i, lodIdx, materialValue, this.getTextureData(i, n, holes, texture));
            else if (boundary.length > 3) {
                //create list of points
                let pList = [];
                for(let k = 0; k < boundary.length; k++)pList.push({
                    x: this.vertices[boundary[k]][0],
                    y: this.vertices[boundary[k]][1],
                    z: this.vertices[boundary[k]][2]
                });
                //get normal of these points
                const normal = this.getNewellsNormal(pList);
                //convert to 2d (for triangulation)
                let pv = [];
                for(let k = 0; k < pList.length; k++){
                    const re = this.to_2d(pList[k], normal);
                    pv.push(re.x);
                    pv.push(re.y);
                }
                //triangulate
                const tr = (0, $cMxmD$earcut)(pv, holes, 2);
                // create faces based on triangulation
                for(let k = 0; k < tr.length; k += 3)for(let n = 0; n < 3; n++){
                    const vertex = boundary[tr[k + n]];
                    this.geomData.addVertex(vertex, idIdx, objType, surfaceType, geomIdx, i, lodIdx, materialValue, this.getTextureData(i, tr[k + n], holes, texture));
                }
            }
        }
    }
    getNewellsNormal(indices) {
        // find normal with Newell's method
        let n = [
            0.0,
            0.0,
            0.0
        ];
        for(let i = 0; i < indices.length; i++){
            let nex = i + 1;
            if (nex == indices.length) nex = 0;
            n[0] = n[0] + (indices[i].y - indices[nex].y) * (indices[i].z + indices[nex].z);
            n[1] = n[1] + (indices[i].z - indices[nex].z) * (indices[i].x + indices[nex].x);
            n[2] = n[2] + (indices[i].x - indices[nex].x) * (indices[i].y + indices[nex].y);
        }
        let b = new (0, $cMxmD$Vector3)(n[0], n[1], n[2]);
        return b.normalize();
    }
    to_2d(p, n) {
        p = new (0, $cMxmD$Vector3)(p.x, p.y, p.z);
        let x3 = new (0, $cMxmD$Vector3)(1.1, 1.1, 1.1);
        if (x3.distanceTo(n) < 0.01) x3.add(new (0, $cMxmD$Vector3)(1.0, 2.0, 3.0));
        let tmp = x3.dot(n);
        let tmp2 = n.clone();
        tmp2.multiplyScalar(tmp);
        x3.sub(tmp2);
        x3.normalize();
        let y3 = n.clone();
        y3.cross(x3);
        let x = p.dot(x3);
        let y = p.dot(y3);
        let re = {
            x: x,
            y: y
        };
        return re;
    }
}




class $7debe21767b359df$export$7feb5c57aa914f3b extends (0, $dc54dc99419ef976$export$3d09a5c28ff3e040) {
    constructor(json, objectIds, objectColors){
        super(json, objectIds, objectColors);
        this.geomData = new (0, $808118d8d449883f$export$358a665d160c13a3)((0, $808118d8d449883f$export$e0de529f548a9140));
    }
    clean() {
        this.geomData = new (0, $808118d8d449883f$export$358a665d160c13a3)((0, $808118d8d449883f$export$e0de529f548a9140));
    }
    handles(geometry) {
        return geometry.type == "MultiLineString";
    }
    parseGeometry(geometry, objectId, geomIdx) {
        const semanticSurfaces = geometry.semantics ? geometry.semantics.surfaces : [];
        if (geometry.type == "MultiLineString") {
            const cityObj = this.json.CityObjects[objectId];
            const idIdx = this.getObjectIdx(objectId);
            const objType = this.getObjectTypeIdx(cityObj.type);
            const lodIdx = this.getLodIndex(cityObj.geometry[geomIdx].lod);
            const linestrings = geometry.boundaries;
            for(let i = 0; i < linestrings.length; i++)if (linestrings[i].length > 1) {
                const semantics = geometry.semantics ? geometry.semantics.values : [];
                const surfaceType = this.getSurfaceTypeIdx(i, semantics, semanticSurfaces);
                const linestring = linestrings[i];
                // Contains the boundary but with the right verticeId
                for(let j = 0; j < linestrings[i].length - 1; j++){
                    this.geomData.addVertex(linestring[j], idIdx, objType, surfaceType, geomIdx, i, lodIdx);
                    this.geomData.addVertex(linestring[j + 1], idIdx, objType, surfaceType, geomIdx, i, lodIdx);
                }
            }
        }
    }
}




class $46725bc4ef05ea63$export$754bf3e67ddd84d8 extends (0, $dc54dc99419ef976$export$3d09a5c28ff3e040) {
    constructor(json, objectIds, objectColors){
        super(json, objectIds, objectColors);
        this.geomData = new (0, $808118d8d449883f$export$358a665d160c13a3)((0, $808118d8d449883f$export$7b26c17728cc9ca5));
    }
    clean() {
        this.geomData = new (0, $808118d8d449883f$export$358a665d160c13a3)((0, $808118d8d449883f$export$7b26c17728cc9ca5));
    }
    handles(geometry) {
        return geometry.type == "MultiPoint";
    }
    parseGeometry(geometry, objectId, geomIdx) {
        const semanticSurfaces = geometry.semantics ? geometry.semantics.surfaces : [];
        if (geometry.type == "MultiPoint") {
            const cityObj = this.json.CityObjects[objectId];
            const idIdx = this.getObjectIdx(objectId);
            const objType = this.getObjectTypeIdx(cityObj.type);
            const lodIdx = this.getLodIndex(cityObj.geometry[geomIdx].lod);
            const points = geometry.boundaries;
            for(let i = 0; i < points.length; i++){
                const semantics = geometry.semantics ? geometry.semantics.values : [];
                const surfaceType = this.getSurfaceTypeIdx(i, semantics, semanticSurfaces);
                this.geomData.addVertex(points[i], idIdx, objType, surfaceType, geomIdx, i, lodIdx);
            }
        }
    }
}



class $9be84a0950af161b$export$15a77ddb18c19f4e extends (0, $cMxmD$InstancedMesh) {
    constructor(citymodel, vertices, geometryData, instanceData, matrix, material){
        const geom = new (0, $cMxmD$InstancedBufferGeometry)();
        const vertexArray = new Float32Array(vertices);
        geom.setAttribute("position", new (0, $cMxmD$BufferAttribute)(vertexArray, 3));
        const idsArray = new Uint16Array(instanceData.objectIds);
        geom.setAttribute("objectid", new (0, $cMxmD$InstancedBufferAttribute)(idsArray, 1));
        const typeArray = new Int32Array(instanceData.objectType);
        geom.setAttribute("type", new (0, $cMxmD$InstancedBufferAttribute)(typeArray, 1));
        const surfaceTypeArray = new Int8Array(geometryData.semanticSurfaces);
        geom.setAttribute("surfacetype", new (0, $cMxmD$Int32BufferAttribute)(surfaceTypeArray, 1));
        const geomIdsArray = new Float32Array(instanceData.geometryIds);
        geom.setAttribute("geometryid", new (0, $cMxmD$InstancedBufferAttribute)(geomIdsArray, 1));
        const lodIdsArray = new Int8Array(geometryData.lodIds);
        geom.setAttribute("lodid", new (0, $cMxmD$BufferAttribute)(lodIdsArray, 1));
        const boundaryIdsArray = new Float32Array(geometryData.boundaryIds);
        geom.setAttribute("boundaryid", new (0, $cMxmD$BufferAttribute)(boundaryIdsArray, 1));
        for(const material in geometryData.materials){
            const materialArray = new Uint8Array(geometryData.materials[material]);
            geom.setAttribute(`mat${material}`, new (0, $cMxmD$Int32BufferAttribute)(materialArray, 1));
        }
        geom.attributes.position.needsUpdate = true;
        if (matrix) geom.applyMatrix4(matrix);
        geom.computeVertexNormals();
        super(geom, material, instanceData.matrices.length);
        for(let j = 0; j < instanceData.matrices.length; j++)this.setMatrixAt(j, instanceData.matrices[j]);
        this.citymodel = citymodel;
        this.isCityObject = true;
        this.isCityObjectMesh = true;
        this.supportsConditionalFormatting = true;
        this.supportsMaterials = true;
    }
    setArrayAsAttribute(array) {
        this.geometry.setAttribute("attributevalue", new (0, $cMxmD$InstancedBufferAttribute)(new Int32Array(array), 1));
    }
    addAttributeByProperty(attributeEvaluator) {
        const allValues = attributeEvaluator.getAllValues();
        const uniqueValues = attributeEvaluator.getUniqueValues();
        if (uniqueValues.length < 110) {
            const objectLookup = [];
            for (const value of allValues)objectLookup.push(uniqueValues.indexOf(value));
            const objectIds = this.geometry.attributes.objectid.array;
            const finalArray = objectIds.map((i)=>{
                return objectLookup[i];
            });
            if (finalArray.length !== objectIds.length) {
                console.warn("Wrong size of attributes array.");
                return;
            }
            this.setArrayAsAttribute(finalArray);
        }
    }
    getIntersectionVertex(intersection) {
        return intersection.face.a;
    }
    resolveIntersectionInfo(intersection) {
        const intersectionInfo = {};
        const vertexIdx = this.getIntersectionVertex(intersection);
        const instanceId = intersection.instanceId;
        const idx = this.geometry.getAttribute("objectid").getX(instanceId);
        intersectionInfo.vertexIndex = vertexIdx;
        intersectionInfo.objectIndex = idx;
        intersectionInfo.objectId = Object.keys(this.citymodel.CityObjects)[idx];
        intersectionInfo.geometryIndex = this.geometry.getAttribute("geometryid").getX(instanceId);
        intersectionInfo.boundaryIndex = this.geometry.getAttribute("boundaryid").getX(vertexIdx);
        intersectionInfo.objectTypeIndex = this.geometry.getAttribute("type").getX(instanceId);
        intersectionInfo.surfaceTypeIndex = this.geometry.getAttribute("surfacetype").getX(vertexIdx);
        intersectionInfo.lodIndex = this.geometry.getAttribute("lodid").getX(vertexIdx);
        return intersectionInfo;
    }
    setTextureTheme(theme, textureManager) {
        if (theme === "undefined") {
            this.unsetTextures();
            return;
        }
        const themeName = theme.replace(/[^a-z0-9]/gi, "");
        const attributeName = `tex${themeName}`;
        if (attributeName in this.geometry.attributes) {
            const textureIds = this.geometry.attributes[attributeName].array;
            // Create a lookup of textures
            const { values: values , indices: indices  } = textureIds.reduce((p, c, i)=>{
                if (p.last !== c) {
                    p.values.push(c);
                    p.indices.push(i);
                    p.last = c;
                }
                return p;
            }, {
                last: -1,
                values: [],
                indices: []
            });
            const baseMaterial = Array.isArray(this.material) ? this.material[this.material.length - 1] : this.material;
            const materials = textureManager.getMaterials(baseMaterial);
            for (const mat of materials)if (mat !== baseMaterial) mat.textureTheme = theme;
            // TODO: We need to add the last element here
            for(let i = 0; i < indices.length - 1; i++)this.geometry.addGroup(indices[i], indices[i + 1] - indices[i], values[i] > -1 ? values[i] : materials.length - 1);
            const i = indices.length - 1;
            this.geometry.addGroup(indices[i], this.geometry.attributes.type.array.length - indices[i], values[i] > -1 ? values[i] : materials.length - 1);
            this.material = materials;
        }
    }
    unsetTextures() {
        if (Array.isArray(this.material)) this.material = this.material[this.material.length - 1];
        this.material.textureTheme = "undefined";
    }
}


class $0465a863dc45de33$export$9dc35ea1c8ec5b0f {
    constructor(){
        this.matrix = null;
        this.onChunkLoad = null;
        this.onComplete = null;
        this.chunkSize = 2000;
        this.loading = false;
        this.objectColors = (0, $1bf9b5416b336d87$export$6d0e25691fb94ddb);
        this.surfaceColors = (0, $1bf9b5416b336d87$export$865247edfe21a42b);
        this.lods = [];
        this.resetMaterial();
    }
    resetMaterial() {
        this.meshMaterial = new (0, $4ab887a77a901977$export$55134f84ad9b986a)((0, $cMxmD$ShaderLib).lambert, {
            objectColors: this.objectColors,
            surfaceColors: this.surfaceColors
        });
        this.lineMaterial = new (0, $d92c295e3c013fe5$export$343a261ace1e0698)({
            color: 0xffffff,
            linewidth: 0.001,
            vertexColors: false,
            dashed: false,
            objectColors: this.objectColors,
            surfaceColors: this.surfaceColors
        });
        this.pointsMaterial = new (0, $f4456a0e1eb1bbfa$export$8eb7f4b873a1ddac)({
            size: 10,
            objectColors: this.objectColors,
            surfaceColors: this.surfaceColors
        });
    }
    setMaterialsColors(objectColors, surfaceColors) {
        this.meshMaterial.objectColors = objectColors;
        this.meshMaterial.surfaceColors = surfaceColors;
        this.lineMaterial.objectColors = objectColors;
        this.lineMaterial.surfaceColors = surfaceColors;
        this.pointsMaterial.objectColors = objectColors;
        this.pointsMaterial.surfaceColors = surfaceColors;
    }
    parse(data, scene) {
        this.loading = true;
        // Sets the web worker that will parse all normal (ie non-instanced)
        // geometries
        const worker = new Worker(new URL("ParserWorker.bb7c24df.js", import.meta.url), {
            type: "module"
        });
        const m = this.matrix;
        const onChunkLoad = this.onChunkLoad;
        const onComplete = this.onComplete;
        const context = this;
        const citymodel = data;
        worker.onmessage = function(e) {
            if (e.data.type === "chunkLoaded") {
                const vertices = e.data.v_buffer;
                const geometryData = e.data.geometryData;
                context.setMaterialsColors(e.data.objectColors, e.data.surfaceColors);
                context.lods = e.data.lods;
                context.objectColors = e.data.objectColors;
                context.surfaceColors = e.data.surfaceColors;
                if (e.data.geometryData.geometryType == (0, $808118d8d449883f$export$8f4dac8c1fc6c4ce)) {
                    const mesh = new (0, $bb9c0ec6c8276320$export$ae02f1ee5353cbee)(citymodel, vertices, geometryData, m, context.meshMaterial);
                    scene.add(mesh);
                }
                if (e.data.geometryData.geometryType == (0, $808118d8d449883f$export$e0de529f548a9140)) {
                    const lines = new (0, $d0c483a9fc7b34a9$export$37a2fa4ad1cc663b)(citymodel, vertices, geometryData, m, context.lineMaterial);
                    scene.add(lines);
                }
                if (e.data.geometryData.geometryType == (0, $808118d8d449883f$export$7b26c17728cc9ca5)) {
                    const points = new (0, $d126339416cd17ed$export$5cfe61655edfe8e7)(citymodel, vertices, geometryData, m, context.pointsMaterial);
                    scene.add(points);
                }
                if (onChunkLoad) onChunkLoad();
            } else if (e.data.type === "done") {
                context.loading = false;
                if (data.appearance && data.appearance.materials) context.meshMaterial.materials = data.appearance.materials;
                if (onComplete) onComplete();
            }
        };
        worker.postMessage([
            data,
            {
                chunkSize: this.chunkSize,
                objectColors: this.objectColors,
                lods: this.lods
            }
        ]);
        // Parse geometry templates
        if (data["geometry-templates"]) {
            const templatesGeomData = [];
            const vertices = data["geometry-templates"]["vertices-templates"];
            const geometryParsers = [
                new (0, $e16946d8863d2c03$export$744c886637201948)(data, Object.keys(data.CityObjects), this.objectColors, vertices),
                new (0, $7debe21767b359df$export$7feb5c57aa914f3b)(data, Object.keys(data.CityObjects), this.objectColors, vertices),
                new (0, $46725bc4ef05ea63$export$754bf3e67ddd84d8)(data, Object.keys(data.CityObjects), this.objectColors, vertices)
            ];
            for (const template of data["geometry-templates"].templates)for (const geometryParser of geometryParsers){
                geometryParser.lods = this.lods;
                geometryParser.parseGeometry(template, -1, -1);
                this.lods = geometryParser.lods;
                if (geometryParser.geomData.count() > 0) templatesGeomData.push(geometryParser.geomData);
                geometryParser.clean();
            }
            const instances = [];
            for(let i = 0; i < templatesGeomData.length; i++)instances.push({
                matrices: [],
                objectIds: [],
                objectType: [],
                geometryIds: []
            });
            for(const objectId in data.CityObjects){
                const cityObject = data.CityObjects[objectId];
                if (cityObject.geometry && cityObject.geometry.length > 0) for(let i = 0; i < cityObject.geometry.length; i++){
                    const geometry = cityObject.geometry[i];
                    if (geometry.type == "GeometryInstance") {
                        const matrix = new (0, $cMxmD$Matrix4)();
                        matrix.set(...geometry.transformationMatrix);
                        matrix.setPosition(...data.vertices[geometry.boundaries[0]]);
                        instances[geometry.template].matrices.push(matrix);
                        instances[geometry.template].objectIds.push(Object.keys(data.CityObjects).indexOf(objectId));
                        instances[geometry.template].objectType.push(Object.keys(this.objectColors).indexOf(cityObject.type));
                        instances[geometry.template].geometryIds.push(i);
                    }
                }
            }
            for(let i = 0; i < templatesGeomData.length; i++){
                if (templatesGeomData[i].geometryType == (0, $808118d8d449883f$export$8f4dac8c1fc6c4ce)) {
                    const mesh = new (0, $9be84a0950af161b$export$15a77ddb18c19f4e)(citymodel, templatesGeomData[i].getVertices(vertices), templatesGeomData[i], instances[i], m, this.meshMaterial);
                    scene.add(mesh);
                } else if (templatesGeomData[i].geometryType == (0, $808118d8d449883f$export$e0de529f548a9140)) for(let j = 0; j < instances[i].matrices.length; j++){
                    templatesGeomData[i].setObjectId(instances[i].objectIds[j]);
                    templatesGeomData[i].setObjectType(instances[i].objectType[j]);
                    templatesGeomData[i].setGeometryIdx(instances[i].geometryIds[j]);
                    const line = new (0, $d0c483a9fc7b34a9$export$37a2fa4ad1cc663b)(templatesGeomData[i].getVertices(vertices), templatesGeomData[i], m, this.lineMaterial);
                    line.applyMatrix4(instances[i].matrices[j]);
                    scene.add(line);
                }
                else if (templatesGeomData[i].geometryType == (0, $808118d8d449883f$export$7b26c17728cc9ca5)) for(let j = 0; j < instances[i].matrices.length; j++){
                    templatesGeomData[i].setObjectId(instances[i].objectIds[j]);
                    templatesGeomData[i].setObjectType(instances[i].objectType[j]);
                    templatesGeomData[i].setGeometryIdx(instances[i].geometryIds[j]);
                    const line = new (0, $d126339416cd17ed$export$5cfe61655edfe8e7)(templatesGeomData[i].getVertices(vertices), templatesGeomData[i], m, this.pointsMaterial);
                    line.applyMatrix4(instances[i].matrices[j]);
                    scene.add(line);
                }
            }
        }
    }
}




class $740840129c0f9269$export$5d5df8072c9935c7 {
    constructor(materialTheme){
        this.matrix = null;
        this.meshVertices = [];
        this.meshTriangles = [];
        this.meshTriangleIDs = [];
        this.materials = [];
        this.materialTheme = materialTheme;
        this.defaultMaterial = new (0, $cMxmD$MeshLambertMaterial)();
        this.defaultMaterial.color.setHex(0xcccccc);
    }
    parse(data, scene) {
        if ("appearance" in data && "materials" in data.appearance) this.materials = data.appearance.materials;
        else this.materials = [];
        for(let i = 0; i < this.materials.length; i++){
            this.meshVertices[i] = [];
            this.meshTriangles[i] = [];
            this.meshTriangleIDs[i] = [];
        }
        this.meshVertices[this.materials.length] = [];
        this.meshTriangles[this.materials.length] = [];
        this.meshTriangleIDs[this.materials.length] = [];
        for(const objectId in data.CityObjects)this.parseObject(objectId, data);
        for(let i = 0; i <= this.materials.length; i++){
            if (this.meshVertices[i].length == 0) continue;
            const geom = new (0, $cMxmD$BufferGeometry)();
            let vertices = [];
            geom.setIndex(this.meshTriangles[i]);
            for (const vertexIndex of this.meshVertices[i]){
                const vertex = data.vertices[vertexIndex];
                vertices.push(...vertex);
            }
            const vertexArray = new Float32Array(vertices);
            geom.setAttribute("position", new (0, $cMxmD$BufferAttribute)(vertexArray, 3));
            geom.getAttribute("position").needsUpdate = true;
            if (this.matrix !== null) geom.applyMatrix4(this.matrix);
            geom.computeVertexNormals();
            let material = new (0, $cMxmD$MeshLambertMaterial)();
            if (i < this.materials.length) material.color.setRGB(...this.materials[i].diffuseColor);
            else material = this.defaultMaterial;
            const mesh = new (0, $cMxmD$Mesh)(geom, material);
            if (i < this.materials.length) mesh.name = this.materials[i].name;
            else mesh.name = "Default";
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.triangleIDs = this.meshTriangleIDs[i];
            scene.add(mesh);
        }
    }
    parseObject(objectId, json) {
        const cityObject = json.CityObjects[objectId];
        if (!(cityObject.geometry && cityObject.geometry.length > 0)) return;
        // TODO: Create a fake all `null` array if the 'material' array doesn't exist in the object.
        for(let geom_i = 0; geom_i < cityObject.geometry.length; geom_i++){
            const geomType = cityObject.geometry[geom_i].type;
            if (geomType == "Solid") {
                const shells = cityObject.geometry[geom_i].boundaries;
                const materialShells = this.getMaterialValues(cityObject.geometry[geom_i]);
                for(let i = 0; i < shells.length; i++)this.parseShell(shells[i], materialShells === null ? null : materialShells[i], objectId, json);
            } else if (geomType == "MultiSurface" || geomType == "CompositeSurface") {
                const surfaces = cityObject.geometry[geom_i].boundaries;
                const materialShell = this.getMaterialValues(cityObject.geometry[geom_i]);
                this.parseShell(surfaces, materialShell, objectId, json);
            } else if (geomType == "MultiSolid" || geomType == "CompositeSolid") {
                const solids = cityObject.geometry[geom_i].boundaries;
                const materialShells = this.getMaterialValues(cityObject.geometry[geom_i]);
                for(let i = 0; i < solids.length; i++)for(let j = 0; j < solids[i].length; j++)this.parseShell(solids[i][j], materialShells === null ? null : materialShells[i][j], objectId, json);
            }
        }
    }
    getMaterialValues(geometry) {
        if ("material" in geometry) return geometry.material[this.materialTheme].values;
        else return null;
    }
    parseShell(boundaries, materialValues, id, json) {
        // Contains the boundary but with the right verticeId
        for(let i = 0; i < boundaries.length; i++){
            let boundary = [];
            let holes = [];
            let vertices;
            let triangles;
            let ids;
            if (materialValues === null || materialValues[i] === null) {
                vertices = this.meshVertices[this.materials.length];
                triangles = this.meshTriangles[this.materials.length];
                ids = this.meshTriangleIDs[this.materials.length];
            } else {
                vertices = this.meshVertices[materialValues[i]];
                triangles = this.meshTriangles[materialValues[i]];
                ids = this.meshTriangleIDs[materialValues[i]];
            }
            for(let j = 0; j < boundaries[i].length; j++){
                if (boundary.length > 0) holes.push(boundary.length);
                boundary.push(...boundaries[i][j]);
            }
            if (boundary.length == 3) for(let n = 0; n < 3; n++){
                const index = vertices.indexOf(boundary[n]);
                if (index == -1) {
                    triangles.push(vertices.length);
                    vertices.push(boundary[n]);
                } else triangles.push(index);
                ids.push(id);
            }
            else if (boundary.length > 3) {
                //create list of points
                let pList = [];
                for(let k = 0; k < boundary.length; k++)pList.push({
                    x: json.vertices[boundary[k]][0],
                    y: json.vertices[boundary[k]][1],
                    z: json.vertices[boundary[k]][2]
                });
                //get normal of these points
                const normal = this.get_normal_newell(pList);
                //convert to 2d (for triangulation)
                let pv = [];
                for(let k = 0; k < pList.length; k++){
                    const re = this.to_2d(pList[k], normal);
                    pv.push(re.x);
                    pv.push(re.y);
                }
                //triangulate
                const tr = (0, $cMxmD$earcut)(pv, holes, 2);
                // create faces based on triangulation
                for(let k = 0; k < tr.length; k += 3)for(let n = 0; n < 3; n++){
                    const vertex = boundary[tr[k + n]];
                    const index = vertices.indexOf(vertex);
                    if (index == -1) {
                        triangles.push(vertices.length);
                        vertices.push(vertex);
                    } else triangles.push(index);
                }
            }
        }
    }
    extractLocalIndices(geom, boundary, indices, json) {
        let new_boundary = [];
        let j;
        for(j = 0; j < boundary.length; j++){
            //the original index from the json file
            let index = boundary[j];
            //if this index is already there
            if (indices.includes(index)) {
                let vertPos = indices.indexOf(index);
                new_boundary.push(vertPos);
            } else {
                // Add vertex to geometry
                let point = new THREE.Vector3(json.vertices[index][0], json.vertices[index][1], json.vertices[index][2]);
                geom.vertices.push(point);
                new_boundary.push(indices.length);
                indices.push(index);
            }
        }
        return new_boundary;
    }
    getBbox(data) {
        let bbox;
        if (data["metadata"] != undefined && data["metadata"]["geographicalExtent"] != undefined) {
            bbox = data["metadata"]["geographicalExtent"];
            if (data["transform"] != undefined) {
                const transform = data["transform"];
                for(let i = 0; i < 3; i++){
                    bbox[i] = bbox[i] - transform["translate"][i];
                    bbox[i + 3] = (bbox[i + 3] - transform["translate"][i]) / transform["scale"][i];
                }
            }
        } else {
            const vertices = data.vertices;
            bbox = [
                Number.MAX_VALUE,
                Number.MAX_VALUE,
                Number.MAX_VALUE,
                Number.MIN_VALUE,
                Number.MIN_VALUE,
                Number.MIN_VALUE
            ];
            for (const v of vertices){
                const x = v[0];
                const y = v[1];
                const z = v[2];
                if (x < bbox[0]) bbox[0] = x;
                else if (x > bbox[3]) bbox[3] = x;
                if (y < bbox[1]) bbox[1] = y;
                else if (y > bbox[4]) bbox[4] = y;
                if (z < bbox[2]) bbox[2] = z;
                else if (z > bbox[5]) bbox[5] = z;
            }
        }
        return bbox;
    }
    get_normal_newell(indices) {
        // find normal with Newell's method
        let n = [
            0.0,
            0.0,
            0.0
        ];
        for(let i = 0; i < indices.length; i++){
            let nex = i + 1;
            if (nex == indices.length) nex = 0;
            n[0] = n[0] + (indices[i].y - indices[nex].y) * (indices[i].z + indices[nex].z);
            n[1] = n[1] + (indices[i].z - indices[nex].z) * (indices[i].x + indices[nex].x);
            n[2] = n[2] + (indices[i].x - indices[nex].x) * (indices[i].y + indices[nex].y);
        }
        let b = new (0, $cMxmD$Vector3)(n[0], n[1], n[2]);
        return b.normalize();
    }
    to_2d(p, n) {
        p = new (0, $cMxmD$Vector3)(p.x, p.y, p.z);
        let x3 = new (0, $cMxmD$Vector3)(1.1, 1.1, 1.1);
        if (x3.distanceTo(n) < 0.01) x3.add(new (0, $cMxmD$Vector3)(1.0, 2.0, 3.0));
        let tmp = x3.dot(n);
        let tmp2 = n.clone();
        tmp2.multiplyScalar(tmp);
        x3.sub(tmp2);
        x3.normalize();
        let y3 = n.clone();
        y3.cross(x3);
        let x = p.dot(x3);
        let y = p.dot(y3);
        let re = {
            x: x,
            y: y
        };
        return re;
    }
}





class $ea82824021a36088$export$a211e9f15ca651ac {
    constructor(){
        this.matrix = null;
        this.chunkSize = 2000;
        this.lods = [];
        this.objectColors = {};
        this.surfaceColors = {};
        this.onchunkload = null;
        this.onComplete = null;
    }
    parse(data) {
        let i = 0;
        const geometryParsers = [
            new (0, $e16946d8863d2c03$export$744c886637201948)(data, Object.keys(data.CityObjects), this.objectColors),
            new (0, $7debe21767b359df$export$7feb5c57aa914f3b)(data, Object.keys(data.CityObjects), this.objectColors),
            new (0, $46725bc4ef05ea63$export$754bf3e67ddd84d8)(data, Object.keys(data.CityObjects), this.objectColors)
        ];
        for(const objectId in data.CityObjects){
            const cityObject = data.CityObjects[objectId];
            if (cityObject.geometry && cityObject.geometry.length > 0) {
                for(let geom_i = 0; geom_i < cityObject.geometry.length; geom_i++)for (const geometryParser of geometryParsers){
                    geometryParser.lods = this.lods;
                    geometryParser.parseGeometry(cityObject.geometry[geom_i], objectId, geom_i);
                    this.lods = geometryParser.lods;
                }
            }
            if (i++ > this.chunkSize) {
                for (const geometryParser of geometryParsers){
                    this.returnObjects(geometryParser, data);
                    geometryParser.clean();
                }
                i = 0;
            }
        }
        for (const geometryParser of geometryParsers){
            // TODO: fix the "finished" flag here - probably better be a
            // different callback
            this.returnObjects(geometryParser, data);
            geometryParser.clean();
        }
        // TODO: this needs some fix - probably a common configuration class
        // shared between the parsers
        this.objectColors = geometryParsers[0].objectColors;
        this.surfaceColors = geometryParsers[0].surfaceColors;
        if (this.onComplete) this.onComplete();
    }
    returnObjects(parser, data) {
        if (parser.geomData.count() > 0) this.onchunkload(parser.geomData.getVertices(data.vertices), parser.geomData.toObject(), parser.lods, parser.objectColors, parser.surfaceColors);
    }
}









class $34d4b5d190971dd9$export$78b9f10bd0b3f1a6 {
    constructor(citymodel, attributeName, includeNulls = false, checkParents = true, checkChildren = true){
        this.citymodel = citymodel;
        this.attributeName = attributeName;
        this.includeNulls = includeNulls;
        this.checkParents = checkParents;
        this.checkChildren = checkChildren;
        this.allValues = [];
        this.uniqueValues = [];
    }
    getAttributeValue(objectId, checkParent = true, checkChildren = true) {
        const cityobject = this.citymodel.CityObjects[objectId];
        if (cityobject.attributes && cityobject.attributes[this.attributeName] !== undefined) return cityobject.attributes[this.attributeName];
        if (checkParent && cityobject.parents) {
            for (const parentId of cityobject.parents)return this.getAttributeValue(parentId, true, false);
        }
        if (checkChildren && cityobject.children || cityobject.members) {
            const children = cityobject.children ? cityobject.children : cityobject.members;
            for (const childId of children)return this.getAttributeValue(childId, false, true);
        }
        return null;
    }
    getAllValues() {
        if (this.allValues.length == 0) {
            const allValues = [];
            for(const objId in this.citymodel.CityObjects)allValues.push(String(this.getAttributeValue(objId, this.checkParents, this.checkChildren)));
            this.allValues = allValues;
        }
        return this.allValues;
    }
    getUniqueValues() {
        if (this.uniqueValues.length == 0) {
            const uniqueValues = new Set(this.getAllValues());
            if (!this.includeNulls) uniqueValues.delete(null);
            // This is a weird hack, but it's because sorting of keys is different
            // than sorting the values in any logical way. So we create a fake
            // object and just take its keys with the order that JS decides to
            // sort them.
            const colors = {};
            for (const value of [
                ...uniqueValues
            ].sort())colors[value] = "";
            this.uniqueValues = Object.keys(colors);
        }
        return this.uniqueValues;
    }
    createColors() {
        const uniqueValues = this.getUniqueValues();
        const colors = {};
        for (const value of uniqueValues)colors[value] = Math.floor(Math.random() * 0xffffff);
        return colors;
    }
}




class $059bf774e43c2744$export$337f59f8fd79d24f {
    constructor(citymodel){
        if (citymodel.appearance && citymodel.appearance.textures) this.cityTextures = citymodel.appearance.textures;
        else this.cityTextures = [];
        this.textures = [];
        this.materials = [];
        this.needsUpdate = false;
        this.onChange = null;
        this.loadFromUrl();
    }
    get totalTextures() {
        return this.cityTextures.length;
    }
    get resolvedTextures() {
        return this.textures.filter((t)=>t).length;
    }
    getMaterials(baseMaterial) {
        if (this.materials.length === 0 || this.needsUpdate) {
            const materials = [];
            for(let i = 0; i < this.cityTextures.length; i++)if (this.textures[i]) {
                const mat = new (0, $4ab887a77a901977$export$55134f84ad9b986a)((0, $cMxmD$ShaderLib).lambert, {
                    objectColors: baseMaterial.objectColors,
                    surfaceColors: baseMaterial.surfaceColors
                });
                mat.uniforms.cityTexture.value = this.textures[i];
                mat.needsUpdate = true;
                materials.push(mat);
            } else materials.push(baseMaterial);
            for (const mat of this.materials)if (mat !== baseMaterial) mat.dispose();
            this.materials = materials;
            this.needsUpdate = false;
        }
        return [
            ...this.materials,
            baseMaterial
        ];
    }
    setTextureFromUrl(i, url) {
        const context = this;
        new (0, $cMxmD$TextureLoader)().load(url, (tex)=>{
            tex.encoding = (0, $cMxmD$sRGBEncoding);
            tex.wrapS = (0, $cMxmD$RepeatWrapping);
            tex.wrapT = (0, $cMxmD$RepeatWrapping);
            context.textures[i] = tex;
            this.needsUpdate = true;
            if (this.onChange) this.onChange();
        });
    }
    loadFromUrl() {
        this.textures = [];
        for (const [i, texture] of this.cityTextures.entries())this.setTextureFromUrl(i, texture.image);
    }
    setTextureFromFile(file) {
        const context = this;
        for (const [i, texture] of this.cityTextures.entries())if (texture.image.includes(file.name)) {
            const reader = new FileReader();
            reader.onload = (event)=>{
                const img = new Image();
                img.onload = (evt)=>{
                    const tex = new (0, $cMxmD$Texture)(evt.target);
                    tex.encoding = (0, $cMxmD$sRGBEncoding);
                    tex.wrapS = (0, $cMxmD$RepeatWrapping);
                    tex.wrapT = (0, $cMxmD$RepeatWrapping);
                    tex.needsUpdate = true;
                    context.textures[i] = tex;
                    this.needsUpdate = true;
                    if (this.onChange) this.onChange();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
}




export {$3eb57bdb1ad2499b$export$639f686e1b458a6e as CityJSONLoader, $0465a863dc45de33$export$9dc35ea1c8ec5b0f as CityJSONWorkerParser, $740840129c0f9269$export$5d5df8072c9935c7 as ObjectMaterialParser, $ea82824021a36088$export$a211e9f15ca651ac as ChunkParser, $9be84a0950af161b$export$15a77ddb18c19f4e as CityObjectsInstancedMesh, $bb9c0ec6c8276320$export$ae02f1ee5353cbee as CityObjectsMesh, $d0c483a9fc7b34a9$export$37a2fa4ad1cc663b as CityObjectsLines, $d126339416cd17ed$export$5cfe61655edfe8e7 as CityObjectsPoints, $4ab887a77a901977$export$55134f84ad9b986a as CityObjectsMaterial, $d92c295e3c013fe5$export$343a261ace1e0698 as CityObjectsLineMaterial, $f4456a0e1eb1bbfa$export$8eb7f4b873a1ddac as CityObjectsPointsMaterial, $34d4b5d190971dd9$export$78b9f10bd0b3f1a6 as AttributeEvaluator, $059bf774e43c2744$export$337f59f8fd79d24f as TextureManager};
//# sourceMappingURL=index.js.map
