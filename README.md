# mariomakely

**mariomakely** is an open-source web-app that automatically posts, sorts, and tags Super Mario Maker levels.

Super Mario Maker's internal level browser currently doesn't allow any form of filtering, sorting, or tagging. Using **mariomakely** and the new "tagging notation" should help solve that problem.


### Tagging Notation

As most of you know, Super Mario Maker allows users to associate a 32-character title with the level they are uploading. **mariomakely** searches for a tagging notation all users can add to the start of their level titles. All you have to do is add words (tags) separated by semi-colons inside of a pair of open-close brackets.

###### Syntax
```
[Tag1; Tag2; Tag3; ...; TagN] level name
```

###### Suggested Usage

As long as the tagging syntax is followed, **mariomakely** allows for users to input any combination and number of tags. This is super flexible, but I have come up with a suggest standard for tagging levels:

```
[TileSet; Difficulty; MiscTag1; MiscTag2; ...; MiscTagN] level name
```
Where -
```
TilesSet = SM1, SM3, SMW, or NSM
Difficulty = Easy, Normal, Hard
MiscTag = Anything you'd like..Ex: "Yoshi", "Water", "Ghost-House", "Auto-play", "Kaizo", "Puzzle"
```
For example, if I made a normal-difficulty, Super Mario 3 Ghost-house level, I would probably tag it by naming my level like this:
```
[SM3; Normal; Ghost-House] Haunted Mansion
```

Using this suggested notation, it becomes simple for users to hop on **mariomakely** and search for easy/hard/normal difficulty mario levels with the tile-set of their choosing. Of course this isn't required, and users are free to tag levels how they see fit!

I hope that **mariomakely** will serve the Super Mario Maker community as a way to give great levels exposure, as well as a way for players to easily find and play levels that appeal to them!
