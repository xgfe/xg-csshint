var exec=require('child_process').exec;
module.exports=function(grunt){

    grunt.initConfig({
        watch:{
            files:['src/**/*.js','test/**/*.spec.js'],
            options:{
                event:['changed']
            }
        }
    });


    grunt.event.on('watch', function(action, filepath, target) {
        console.log('===============');
        console.log('jasmine test start!');
        exec('jasmine JASMINE_CONFIG_PATH=jasmine.json',function(err,out){
            if(err){
                console.log(err);
            }
            console.log(out);
        });
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

}

