import {Vector3 as $8OtxS$Vector3} from "three";
import $8OtxS$earcut from "earcut";

var $a03f6e95fa82e63d$exports = {};
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $a03f6e95fa82e63d$var$runtime = function(exports) {
    "use strict";
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return obj[key];
    }
    try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
    } catch (err) {
        define = function(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
    }
    exports.wrap = wrap;
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
        if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
        return {
            __await: arg
        };
    };
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") reject(record.arg);
            else {
                var result = record.arg;
                var value = result.value;
                if (value && typeof value === "object" && hasOwn.call(value, "__await")) return PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                });
                return PromiseImpl.resolve(value).then(function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                }, function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                });
            }
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    });
    exports.AsyncIterator = AsyncIterator;
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
         : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) throw new Error("Generator is already running");
            if (state === GenStateCompleted) {
                if (method === "throw") throw arg;
                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while(true){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if (context.method === "next") // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
                else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                    }
                    context.dispatchException(context.arg);
                } else if (context.method === "return") context.abrupt("return", context.arg);
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                }
            }
        };
    }
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method always terminates the yield* loop.
            context.delegate = null;
            if (context.method === "throw") {
                // Note: ["return"] must be used for ES3 parsing compatibility.
                if (delegate.iterator["return"]) {
                    // If the delegate iterator has a return method, give it a
                    // chance to clean up.
                    context.method = "return";
                    context.arg = undefined;
                    maybeInvokeDelegate(delegate, context);
                    if (context.method === "throw") // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
                }
                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a 'throw' method");
            }
            return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
        }
        if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;
            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;
            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
            }
        } else // Re-yield the result returned by the delegate method.
        return info;
        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
    }
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
        return this;
    });
    define(Gp, "toString", function() {
        return "[object Generator]";
    });
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) entry.catchLoc = locs[1];
        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
    }
    function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    }
    exports.keys = function(object) {
        var keys = [];
        for(var key in object)keys.push(key);
        keys.reverse();
        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
            while(keys.length){
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
        };
    };
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if (typeof iterable.next === "function") return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    while(++i < iterable.length)if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next.next = next;
            }
        }
        // Return an iterator with no values.
        return {
            next: doneResult
        };
    }
    exports.values = values;
    function doneResult() {
        return {
            value: undefined,
            done: true
        };
    }
    Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for(var name in this)// Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) this[name] = undefined;
            }
        },
        stop: function() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                }
                return !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                        else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                    } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else throw new Error("try statement without catch or finally");
                }
            }
        },
        abrupt: function(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
            }
            return this.complete(record);
        },
        complete: function(record, afterLoc) {
            if (record.type === "throw") throw record.arg;
            if (record.type === "break" || record.type === "continue") this.next = record.arg;
            else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) this.next = afterLoc;
            return ContinueSentinel;
        },
        finish: function(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        "catch": function(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            if (this.method === "next") // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
            return ContinueSentinel;
        }
    };
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
}(// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
(0, $a03f6e95fa82e63d$exports));
try {
    regeneratorRuntime = $a03f6e95fa82e63d$var$runtime;
} catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") globalThis.regeneratorRuntime = $a03f6e95fa82e63d$var$runtime;
    else Function("r", "regeneratorRuntime = r")($a03f6e95fa82e63d$var$runtime);
}


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
                const tr = (0, $8OtxS$earcut)(pv, holes, 2);
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
        let b = new (0, $8OtxS$Vector3)(n[0], n[1], n[2]);
        return b.normalize();
    }
    to_2d(p, n) {
        p = new (0, $8OtxS$Vector3)(p.x, p.y, p.z);
        let x3 = new (0, $8OtxS$Vector3)(1.1, 1.1, 1.1);
        if (x3.distanceTo(n) < 0.01) x3.add(new (0, $8OtxS$Vector3)(1.0, 2.0, 3.0));
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


onmessage = function(e) {
    const parser = new (0, $ea82824021a36088$export$a211e9f15ca651ac)();
    const props = e.data[1];
    if (props) {
        if (props.chunkSize) parser.chunkSize = props.chunkSize;
        if (props.objectColors) parser.objectColors = props.objectColors;
        if (props.lods) parser.lods = props.lods;
    }
    parser.onchunkload = (v, geometryData, lods, objectColors, surfaceColors)=>{
        const vertexArray = new Float32Array(v);
        const vertexBuffer = vertexArray.buffer;
        const msg = {
            type: "chunkLoaded",
            v_buffer: vertexBuffer,
            geometryData: geometryData,
            lods: lods,
            objectColors: objectColors,
            surfaceColors: surfaceColors
        };
        postMessage(msg, [
            vertexBuffer
        ]);
    };
    parser.onComplete = ()=>{
        this.postMessage({
            type: "done"
        });
    };
    parser.parse(e.data[0]);
};


//# sourceMappingURL=ParserWorker.bb7c24df.js.map
