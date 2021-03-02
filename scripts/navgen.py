from pathlib import Path
from typer import (
    Typer,
    Option,
    secho
)
from rich.console import Console
from rich.columns import Columns
from rich import print
import platform


app = Typer()
console = Console()

SYSTEM_REPALCE_FRAMENT = '/'
if platform.system() == 'Windows':
    SYSTEM_REPALCE_FRAMENT = '\\'


@app.command('tree')
def tree(
    path: Path = Option(
        ...,
        exists=True,
        file_okay=True,
        dir_okay=True,
        writable=False,
        readable=True,
        resolve_path=False,
    )
):

    results = sorted(
        list(
            map(
                lambda x:
                    x.__str__().replace(SYSTEM_REPALCE_FRAMENT, '-').replace('.md', '') + ': ' + x.__str__(),  # noqa
                list(
                    filter(
                        lambda x:
                            x.is_file(),
                        list(path.glob('**/*.md')
                             )
                    ))
            )
        )
    )

    print(Columns(results))
    # secho(results.__str__())


@app.command('foobar')
def foobar():
    secho('foobar')


if __name__ == '__main__':
    app()
