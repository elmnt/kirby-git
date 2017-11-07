# kirby-git

Another starting point for Kirby CMS projects.  

Reference:  

https://getkirby.com/docs/cookbook/working-with-git  

In this instance, /kirby and /panel are submobules, for easier updating. I added a TextExpander snippet, so anytime I need to update them, I just execute my bash script with:    

`k-update`  

That just auto-completes `./update.sh` which I could just as easily type, to execute the script, but my snippet is simpler and more intuitive for me.

## Getting Started  

##### clone and install  

`git clone git@github.com:elmnt/kirby-git.git your-repo`  
`npm install`  

##### get the /kirby and /panel submodules  

`git submodule update --init --recursive`  

##### start it up

`gulp`  

## More Info

I plan to replace my kirby-starter project, once I've included my personal CSS framework. The latest version of the core Kirby CSS is included now, which, it's worth saying, the Kirby team have done a really nice job with. It's already a great starting point.  

