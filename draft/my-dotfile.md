# my rcfile

flake8
tmux
vim
zsh
bash
.gitignore
poetry


export UPDATE_ZSH_DAYS=13

path=(
    /usr/local/opt/sqlite/bin
    /usr/local/opt/curl/bin                  # curl in brew
    /usr/local/opt/ruby/bin                  # ruby
    /usr/local/opt/coreutils/libexec/gnubin  # Gnu coreutils
    /usr/local/Cellar/mysql/8.0.18/bin       # mysql bins
    /opt/homebrew/bin
    $HOME/bin
    $HOME/shopee-bin
    $GOPATH/bin                              # golang
    $GOROOT/bin
    $HOME/.local/bin                         # pipx
    /Users/laixintao/.cargo/bin              # cargo
    /usr/local/texlive/2020basic/bin/x86_64-darwin/ #latex
    $path
  )


# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# Pretty print the path
alias path='echo $PATH | tr -s ":" "\n"'


# Include custom aliases
if [[ -f ~/.aliases.local ]]; then
  source ~/.aliases.local
fi


# aliases
[[ -f ~/.aliases ]] && source ~/.aliases

# load custom executable functions
for function in ~/.zsh/functions/*; do
  source $function
done




https://github.com/junegunn/fzf