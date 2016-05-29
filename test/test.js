'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const beforeEach = lab.beforeEach;

const CompileHook = require('../index');

// Remove cache in require for tests
beforeEach((done) => {

    const modules = Object.keys(require.cache);
    modules.forEach((moduleName) => {

        if (moduleName.endsWith('testModules/module1.js') || moduleName.endsWith('testModules/module2.js')) {
            delete require.cache[moduleName];
        }
    });
    done();
});

describe('Place and remove hook', () => {

    it('should place the hook, then require module1 then remove hook and require module2', { plan: 10 }, (testDone) => {

        const journal = [];

        CompileHook.placeHook((content, filename, done) => {

            journal.push(filename);
            done();
        });

        const Module1 = require('./testModules/module1');
        expect(Module1.action).to.exist();
        expect(Module1.action).to.be.a.instanceof(Function);
        expect(journal).to.have.length(1);

        CompileHook.removeHook();
        const Module2 = require('./testModules/module2');
        expect(Module2.eleven).to.exist();
        expect(Module2.eleven).to.equal(11);
        expect(Module2.constant).to.exist();
        expect(Module2.constant).to.equal(1492);
        expect(Module2.number).to.exist();
        expect(Module2.number).to.equal(1515);
        expect(journal).to.have.length(1);

        testDone();
    });
});

describe('Place hook that changes code on the fly', () => {

    it('should change the value of module2.constant', { plan: 1 }, (testDone) => {

        CompileHook.placeHook((content, filename, done) => {

            done(content.replace(1492, 622));
        });

        const Module2 = require('./testModules/module2');
        expect(Module2.constant).to.equal(622);

        testDone();
    });
});



