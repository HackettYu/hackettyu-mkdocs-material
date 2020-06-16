function addSummary() {
	for file in `ls $FilePath`; do
		FilePath= pwd
		if test -d $file; then
			cd $file
			addSummary
			book sm
			cd ..
		else
			continue
		fi
	done
}
addSummary